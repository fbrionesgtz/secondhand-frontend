import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = (props) => {
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (props.productId && !product._id) {
      sendRequest(
        {
          url: `http://localhost:8080/products/${props.productId}`,
          headers: {
            Authorization: token,
          },
        },
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
        headers: {
          Authorization: token,
        },
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
            backgroundImage: `url(http://localhost:8080/${product.productImage})`,
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
