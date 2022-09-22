import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import BackButton from "../../UI/Button/BackButton/BackButton";
import styles from "./ProductDetails.module.css";
import { uiActions } from "../../../store/ui-slice";
import Modal from "../../UI/Modal/Modal";
import ProductSeller from "../ProductSeller/ProductSeller";

const ProductDetails = (props) => {
  const { sendRequest, error, isLoading } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userProducts = useSelector((state) => state.user.userProducts);
  const showDeletePrompt = useSelector((state) => state.ui.deletePrompt);
  const [product, setProduct] = useState({});
  const [productSeller, setProductSeller] = useState({});

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
          const strPhoneNumber = data.owner.phoneNumber.toString();
          const phoneNumber = `(${strPhoneNumber.slice(
            0,
            3
          )}) ${strPhoneNumber.slice(3, 6)}-${strPhoneNumber.slice(6, 10)}`;

          const owner = {
            _id: data.owner._id,
            profileImage: data.owner.profileImage,
            firstName: data.owner.firstName,
            lastName: data.owner.lastName,
            email: data.owner.email,
            phoneNumber: phoneNumber,
          };

          setProductSeller(owner);
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
          <div className={styles.product}>
            <div className={styles.productImg}>
              <div
                className={styles.img}
                style={{
                  backgroundImage: `url(http://localhost:8080/${product.productImage})`,
                }}
              />
            </div>
          </div>
          <div className={styles.productContent}>
            <h1>{product.title}</h1>
            <hr />
            <div>
              <p>Price</p>
              <p>{`$${product.price}`}</p>
            </div>
            <div>
              <p>Category</p>
              <p>{product.category}</p>
            </div>
            <div>
              <p>Description</p>
              <p>{product.description}</p>
            </div>
            {productSeller && (
              <ProductSeller
                _id={productSeller._id}
                name={`${productSeller.firstName} ${productSeller.lastName}`}
                profileImage={productSeller.profileImage}
                email={productSeller.email}
                phoneNumber={productSeller.phoneNumber}
              />
            )}
            {userProducts.find((p) => p._id === product._id) && (
              <div className={styles.actions}>
                <Button
                  content="Edit Product"
                  class="primary"
                  styles={{ marginRight: "1rem" }}
                  onClick={props.onEditProduct.bind(
                    null,
                    product._id,
                    "update"
                  )}
                />
                <Button
                  content="Delete Product"
                  class="secondary"
                  onClick={() => {
                    dispatch(uiActions.showDeletePrompt());
                  }}
                />
              </div>
            )}
            {showDeletePrompt && (
              <Modal>
                <div className={styles.deletePrompt}>
                  <p>Are you sure you want to delete the product?</p>
                  <Button
                    content="Delete"
                    styles={{ marginRight: "1rem" }}
                    class="primary"
                    onClick={handleDeleteProduct.bind(null, product._id)}
                  />
                  <Button
                    content="Cancel"
                    class="secondary"
                    onClick={() => {
                      dispatch(uiActions.hideDeletePrompt());
                    }}
                  />
                </div>
              </Modal>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ProductDetails;
