import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "./store/product-slice";
import useHttp from "./hooks/use-http";
import ShopPage from "./pages/ShopPage";
import EditProductPage from "./pages/EditProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import SignUpForm from "./components/Auth/SignUp/SignUpForm";
import LogInForm from "./components/Auth/LogIn/LogInForm";

function App() {
  const { sendRequest, isLoading, error } = useHttp();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const reloadProducts = useSelector((state) => state.product.reloadProducts);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const transformProducts = (products) => {
      const transformedProducts = [];
      for (const key in products["products"]) {
        transformedProducts.push({
          _id: products["products"][key]._id,
          title: products["products"][key].title,
          price: products["products"][key].price,
          description: products["products"][key].description,
          productImage: products["products"][key].productImage,
        });
      }

      dispatch(productActions.setProducts(transformedProducts));
    };

    if (token) {
      sendRequest(
        {
          url: "http://localhost:8080/products",
          headers: { Authorization: token },
        },
        transformProducts
      );
    }
  }, [sendRequest, reloadProducts]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/signup" element={<SignUpForm />} />
      <Route path="/auth/login" element={<LogInForm />} />
      <Route path="/shop/:productId" element={<ProductDetailsPage />} />
      <Route
        path="/shop"
        element={<ShopPage isLoading={isLoading} error={error} />}
      />
      <Route path="/add-product" element={<EditProductPage />} />
      <Route path="/update-product/:productId" element={<EditProductPage />} />
    </Routes>
  );
}

export default App;
