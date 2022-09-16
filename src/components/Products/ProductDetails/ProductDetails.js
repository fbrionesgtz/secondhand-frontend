import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import BackButton from "../../UI/Button/BackButton/BackButton";
import { MdEmail, MdPhone } from "react-icons/md";
import styles from "./ProductDetails.module.css";

const ProductDetails = (props) => {
  const { sendRequest, error, isLoading } = useHttp();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userProducts = useSelector((state) => state.user.userProducts);
  const [product, setProduct] = useState({});
  const [productOwner, setProductOwner] = useState({});

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

      sendRequest(
        {
          url: `http://localhost:8080/products/owner/${props.productId}`,
          headers: {
            Authorization: token,
          },
        },
        (data) => {
          setProductOwner(data.owner);
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
    <Fragment>
      {error && <p>Something went wrong.</p>}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <section className={styles.productDetails}>
          <BackButton />
          <div className={styles.productImg}>
            <img src={`http://localhost:8080/${product.productImage}`} />
          </div>
          <div className={styles.productContent}>
            <h1>{product.title}</h1>
            <p>{`$${product.price}`}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            {userProducts.find((p) => p._id === product._id) && (
              <div className={styles.actions}>
                <Button
                  content="Edit"
                  class="primary"
                  styles={{ marginRight: "1rem" }}
                  onClick={props.onEditProduct.bind(
                    null,
                    product._id,
                    "update"
                  )}
                />
                <Button
                  content="Delete"
                  class="secondary"
                  onClick={handleDeleteProduct.bind(null, product._id)}
                />
              </div>
            )}
            <div className={styles.productOwner}>
              <div className={styles.ownerImage}>
                <img
                  src={`http://localhost:8080/${productOwner.profileImage}`}
                />
              </div>
              <div className={styles.ownerInfo}>
                <h3>{`${productOwner.firstName} ${productOwner.lastName}`}</h3>
                <div className={styles.contact}>
                  <MdEmail />
                  <p>{productOwner.email}</p>
                </div>
                <div className={styles.contact}>
                  <MdPhone />
                  <p>{productOwner.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ProductDetails;
