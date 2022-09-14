import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "./store/product-slice";
import { userActions } from "./store/user-slice";
import useHttp from "./hooks/use-http";
import ShopPage from "./pages/ShopPage";
import EditProductPage from "./pages/EditProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
  const { sendRequest, isLoading, error } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reloadProducts = useSelector((state) => state.product.reloadProducts);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const transformProducts = (products) => {
      const transformedProducts = [];
      for (const key in products["products"]) {
        transformedProducts.push({
          _id: products["products"][key]._id,
          title: products["products"][key].title,
          category: products["products"][key].category,
          price: products["products"][key].price,
          description: products["products"][key].description,
          productImage: products["products"][key].productImage,
        });
      }

      return transformedProducts;
    };

    if (token) {
      sendRequest(
        {
          url: "http://localhost:8080/auth/user",
          headers: { Authorization: token },
        },
        (data) => {
          dispatch(userActions.setUser(data.user));
        }
      );

      if (error) {
        navigate("/auth/login");
        console.log("your session expired");
      }

      sendRequest(
        {
          url: "http://localhost:8080/products",
          headers: { Authorization: token },
        },
        (products) => {
          dispatch(productActions.setProducts(transformProducts(products)));
        }
      );
    } else {
      navigate("/");
      console.log("you must login");
    }
  }, [sendRequest, reloadProducts, token]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />
      <Route path="/auth/login" element={<LogInPage />} />
      <Route path="/user" element={<UserDetailsPage />} />
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
