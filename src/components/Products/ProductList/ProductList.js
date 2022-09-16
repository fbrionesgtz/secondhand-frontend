import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";

const ProductList = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const location = useLocation();
  const navigate = useNavigate();
  let screenWidth = window.innerWidth;

  const gridStyles =
    screenWidth <= 1900 && screenWidth > 1830
      ? "repeat(6, 15rem)"
      : screenWidth <= 1830 && screenWidth > 1500
      ? "repeat(5, 15rem)"
      : screenWidth <= 1500 && screenWidth > 1300
      ? "repeat(4, 15rem)"
      : screenWidth <= 1300 && screenWidth > 1190
      ? "repeat(3, 15rem)"
      : screenWidth <= 1190 && screenWidth > 760
      ? "repeat(2, 15rem)"
      : "repeat(1, 15rem)";

  const handleProductClick = (prodId) => {
    navigate(`/shop/${prodId}`);
  };

  return (
    <div
      className={styles.productListGrid}
      style={
        !showSideBar && location.pathname.includes("shop")
          ? { gridTemplateColumns: `${gridStyles}` }
          : location.pathname.includes("user")
          ? { marginTop: "0" }
          : {}
      }
    >
      {props.error && <p>Something went wrong</p>}
      {props.isLoading && <Loader />}
      {props.products
        .filter((p) => {
          const minPrice = props.filters.priceRange
            ? props.filters.priceRange.min
            : null;
          const maxPrice = props.filters.priceRange
            ? props.filters.priceRange.max
            : null;
          const filterBySearch = p.title
            .toLowerCase()
            .includes(props.search.toLowerCase());

          const filterByCategory = props.filters.categories.includes(
            p.category
          );

          const filterByPriceRange =
            minPrice && maxPrice
              ? p.price >= minPrice && p.price <= maxPrice
              : minPrice
              ? p.price >= minPrice
              : maxPrice && p.price <= maxPrice;

          if (filterBySearch && props.filters.categories.length > 0) {
            return filterBySearch && filterByCategory;
          }

          if (minPrice || maxPrice) {
            return filterByPriceRange;
          }

          if (filterBySearch && props.filters.categories.length === 0) {
            return filterBySearch;
          }
        })
        .map((p) => (
          <Product
            key={p._id}
            title={p.title}
            price={p.price}
            description={p.description}
            productImage={p.productImage}
            category={p.category}
            onClick={handleProductClick.bind(null, p._id)}
          />
        ))}
    </div>
  );
};

export default ProductList;
