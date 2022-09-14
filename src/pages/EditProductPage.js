import ProductForm from "../components/Products/ProductForm/ProductForm";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/product-slice";
import useHttp from "../hooks/use-http";
import Card from "../components/UI/Card/Card";
import { Fragment } from "react";
import BackButton from "../components/UI/Button/BackButton/BackButton";

const EditProductPage = () => {
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  const handlePostProduct = async (product) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.productImage);

    sendRequest(
      {
        url: "http://localhost:8080/products",
        method: "POST",
        headers: {
          Authorization: token,
        },
        formData: formData,
      },
      () => {
        dispatch(productActions.reloadProducts());
        navigate("/shop");
      }
    );
  };

  const handleUpdatePost = async (product) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.productImage);

    sendRequest(
      {
        url: `http://localhost:8080/products/${productId}`,
        method: "PUT",
        headers: {
          Authorization: token,
        },
        formData: formData,
      },
      () => {
        dispatch(productActions.reloadProducts());
        navigate("/shop");
      }
    );
  };

  const handleOnSubmit = (product) => {
    if (location.pathname.includes("add")) {
      handlePostProduct(product);
    } else if (location.pathname.includes("update")) {
      handleUpdatePost(product);
    }
  };

  return (
    <Fragment>
      <BackButton />
      <Card
        styles={{
          width: "32rem",
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -20%)",
        }}
      >
        <ProductForm
          onSubmit={handleOnSubmit}
          productId={productId ? productId : null}
        />
      </Card>
    </Fragment>
  );
};

export default EditProductPage;
