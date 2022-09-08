import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";
import { VscLoading } from "react-icons/vsc";

const ProductList = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();

  const handleProductClick = (prodId) => {
    navigate(`/shop/${prodId}`);
  };

  return (
    <div
      className={styles.productListGrid}
      style={!showSideBar ? { gridTemplateColumns: "repeat(7, 15rem)" } : {}}
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
