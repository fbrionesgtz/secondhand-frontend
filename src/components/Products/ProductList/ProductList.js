import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";

const ProductList = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const location = useLocation();
  const navigate = useNavigate();

  const handleProductClick = (prodId) => {
    navigate(`/shop/${prodId}`);
  };

  return (
    <div
      className={styles.productListGrid}
      style={location.pathname.includes("user") ? { marginTop: "0" } : {}}
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
              : maxPrice
              ? p.price <= maxPrice
              : false;

          if ((minPrice || maxPrice) && props.filters.categories.length > 0) {
            return filterBySearch && filterByCategory && filterByPriceRange;
          }

          if (props.filters.categories.length > 0 && !minPrice && !maxPrice) {
            return filterByCategory && filterBySearch;
          }

          if ((minPrice || maxPrice) && props.filters.categories.length === 0) {
            return filterByPriceRange && filterBySearch;
          }

          return filterBySearch;
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
