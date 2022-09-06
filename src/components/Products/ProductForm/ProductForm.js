import { useEffect, useRef, useState } from "react";
import useHttp from "../../../hooks/use-http";

const ProductForm = (props) => {
  const { sendRequest } = useHttp();
  const [productToUpdate, setProductToUpdate] = useState({});
  const titleRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const [image, setImage] = useState();
  const descriptionRef = useRef();
  const productId = props.productId;

  useEffect(() => {
    if (productId) {
      sendRequest(
        { url: `http://localhost:8080/products/${productId}` },
        (data) => {
          setProductToUpdate(data.product);
        }
      );
    }
  }, [sendRequest, productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      image: image,
    };

    props.onSubmit(product);
  };

  const handleImageChange = (e) => {
    if (!productId && e.target.files) {
      setImage(e.target.files[0]);
    } else if (productId && !e.target.files) {
      setImage(productToUpdate.image);
    } else if (productId && e.target.files) {
      console.log(e.target.files);
      setImage(e.target.files[0]);
    }
  };

  return (
    <form
      action="/"
      method="POST"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="title"
        name="title"
        ref={titleRef}
        placeholder="Enter title"
        defaultValue={productId ? productToUpdate.title : null}
      />
      <select
        id="category"
        name="category"
        type="select"
        ref={categoryRef}
        defaultValue={productId ? productToUpdate.category : null}
      >
        <option value="Vehicles">Vehicles</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Home Goods">Home Goods</option>
        <option value="Toys & Games">Toys & Games</option>
        <option value="Pet Supplies">Pet Supplies</option>
        <option value="Sports Supplies">Sports Supplies</option>
        <option value="Outdoors">Outdoors</option>
      </select>
      <input
        type="number"
        min="0"
        step="0.01"
        id="price"
        name="price"
        ref={priceRef}
        placeholder="Enter price"
        defaultValue={productId ? productToUpdate.price : null}
      />
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        placeholder="Enter image"
      />
      <textarea
        id="description"
        name="description"
        ref={descriptionRef}
        placeholder="Enter description"
        defaultValue={productId ? productToUpdate.description : null}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
