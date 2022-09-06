import ProductForm from "../components/Products/ProductForm/ProductForm";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useHttp from "../hooks/use-http";

const EditProductPage = (props) => {
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  const handlePostProduct = async (product) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.image);

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Add product failed");
      }

      const data = await response.json();
      navigate("/shop");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePost = async (product) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.image);

    try {
      const response = await fetch(
        `http://localhost:8080/products/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Update product failed");
      }

      const data = await response.json();
      navigate("/shop");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSubmit = (product) => {
    if (location.pathname.includes("add")) {
      handlePostProduct(product);
    } else if (location.pathname.includes("update")) {
      handleUpdatePost(product);
    }
  };

  return <ProductForm onSubmit={handleOnSubmit} productId={productId} />;
};

export default EditProductPage;
