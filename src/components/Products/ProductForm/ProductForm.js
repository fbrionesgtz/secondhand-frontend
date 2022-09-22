import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import styles from "../../Auth/Form.module.css";
import Button from "../../UI/Button/Button";

const ProductForm = (props) => {
  const { sendRequest, error } = useHttp();
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [productToUpdate, setProductToUpdate] = useState({});
  const productId = props.productId;

  const isEmpty = (value) => value.trim().length > 0;

  const validImage = (value) =>
    value.type === "image/jpeg" ||
    value.type === "image/jpg" ||
    value.type === "image/png" ||
    value.type === "image/webp";

  const validPrice = (value) => value && value >= 0;

  const validDescription = (value) => value.trim().length >= 30;

  const {
    value: productImage,
    isValid: productImageIsValid,
    valueInputChangeHandler: productImageChangeHandler,
  } = useInput(
    validImage,
    "Please choose a jpeg, jpg, png, or webp file.",
    true
  );

  const {
    value: title,
    isValid: titleIsValid,
    valueInputChangeHandler: titleChangeHandler,
    valueInputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(
    isEmpty,
    "Please enter a title.",
    false,
    productId && productToUpdate.title
  );

  const {
    value: category,
    isValid: categoryIsValid,
    valueInputChangeHandler: categoryChangeHandler,
    valueInputBlurHandler: categoryBlurHandler,
    reset: resetCategory,
  } = useInput(
    isEmpty,
    "Please select a category.",
    false,
    productId && productToUpdate.category
  );

  const {
    value: price,
    isValid: priceIsValid,
    valueInputChangeHandler: priceChangeHandler,
    valueInputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(
    validPrice,
    "Price must be zero or more.",
    false,
    productId && productToUpdate.price
  );

  const {
    value: description,
    isValid: descriptionIsValid,
    valueInputChangeHandler: descriptionChangeHandler,
    valueInputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(
    validDescription,
    "Description must be at least 30 characters long.",
    false,
    productId && productToUpdate.description
  );

  useEffect(() => {
    if (productId) {
      sendRequest(
        {
          url: `http://localhost:8080/products/${productId}`,
          headers: {
            Authorization: token,
          },
        },
        (data) => {
          setProductToUpdate(data.product);
        }
      );

      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !titleIsValid ||
      !categoryIsValid ||
      !priceIsValid ||
      !productImageIsValid ||
      !descriptionIsValid
    ) {
      return;
    }

    const product = {
      title: title,
      price: price,
      category: category,
      description: description,
      productImage: productImage,
    };

    props.onSubmit(product);

    resetTitle();
    resetCategory();
    resetPrice();
    resetDescription();
  };

  return (
    <div className={styles.form}>
      <h1>
        {location.pathname.includes("add")
          ? "Add Product"
          : location.pathname.includes("update") && "Update Product"}
      </h1>
      <form
        action={location.pathname}
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className={`${styles.control} ${!titleIsValid && styles.error}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            placeholder="Enter title"
          />
        </div>
        <div
          className={`${styles.control} ${!categoryIsValid && styles.error}`}
        >
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            type="select"
            value={category}
            onChange={categoryChangeHandler}
            onBlur={categoryBlurHandler}
          >
            <option value="">Categories</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Sports Supplies">Sports Supplies</option>
            <option value="Outdoors">Outdoors</option>
          </select>
        </div>
        <div className={`${styles.control} ${!priceIsValid && styles.error}`}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            id="price"
            name="price"
            value={price}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
            placeholder="Enter price"
          />
        </div>
        <div
          className={`${styles.control} ${
            !productImageIsValid && styles.error
          }`}
        >
          <label htmlFor="image">Product picture</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={productImageChangeHandler}
          />
        </div>
        <div
          className={`${styles.control} ${!descriptionIsValid && styles.error}`}
        >
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            placeholder="Enter description"
          />
        </div>
        <Button type="submit" class="primary" content="Submit" />
      </form>
    </div>
  );
};

export default ProductForm;
