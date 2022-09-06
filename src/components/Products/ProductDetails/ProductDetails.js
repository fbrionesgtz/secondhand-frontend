import { useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = (props) => {
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (props.productId && !product._id) {
      sendRequest(
        { url: `http://localhost:8080/products/${props.productId}` },
        (data) => {
          setProduct(data.product);
        }
      );
    }
  }, [props.productId, sendRequest]);

  const handleDeleteProduct = (productId) => {
    sendRequest(
      {
        url: `http://localhost:8080/products/${productId}`,
        method: "DELETE",
      },
      () => {
        navigate("/shop");
      }
    );
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <div className={styles.productImg}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(http://localhost:8080/${product.image})`,
          }}
        />
      </div>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <button
        type="button"
        onClick={props.onEditProduct.bind(null, product._id, "update")}
      >
        Edit
      </button>
      <button
        type="button"
        onClick={handleDeleteProduct.bind(null, product._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ProductDetails;
