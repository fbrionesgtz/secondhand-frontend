import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";
import { VscLoading } from "react-icons/vsc";

const ProductList = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  let screenWidth = window.innerWidth;

  const gridStyles =
    screenWidth <= 1900 && screenWidth > 1830
      ? "repeat(7, 15rem)"
      : screenWidth <= 1830 && screenWidth > 1500
      ? "repeat(6, 15rem)"
      : screenWidth <= 1500 && screenWidth > 1300
      ? "repeat(5, 15rem)"
      : screenWidth <= 1300 && screenWidth > 1190
      ? "repeat(4, 15rem)"
      : screenWidth <= 1190 && screenWidth > 760
      ? "repeat(2, 15rem)"
      : "repeat(1, 15rem)";

  const handleProductClick = (prodId) => {
    navigate(`/shop/${prodId}`);
  };

  return (
    <div
      className={styles.productListGrid}
      style={!showSideBar ? { gridTemplateColumns: `${gridStyles}` } : {}}
    >
      {props.error && <p>Something went wrong</p>}
      {props.isLoading && <VscLoading className={styles.loader} />}
      {products.map((p) => {
        if (p.title.toLowerCase().includes(props.search.toLowerCase())) {
          return (
            <Product
              key={p._id}
              title={p.title}
              price={p.price}
              description={p.description}
              productImage={p.productImage}
              onClick={handleProductClick.bind(null, p._id)}
            />
          );
        }
      })}
    </div>
  );
};

export default ProductList;
