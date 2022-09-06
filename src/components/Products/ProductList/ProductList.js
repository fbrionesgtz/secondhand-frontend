import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";

const ProductList = (props) => {
  const navigate = useNavigate();

  const handleProductClick = (prodId) => {
    navigate(`/shop/${prodId}`);
  };

  return (
    <div
      className={styles.productListGrid}
      style={
        !props.showSideBar ? { gridTemplateColumns: "repeat(7, 15rem)" } : {}
      }
    >
      {props.products.map((p) => {
        if (p.title.toLowerCase().includes(props.search.toLowerCase())) {
          return (
            <Product
              key={p._id}
              title={p.title}
              price={p.price}
              description={p.description}
              image={p.image}
              onClick={handleProductClick.bind(null, p._id)}
            />
          );
        }
      })}
    </div>
  );
};

export default ProductList;
