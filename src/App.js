import { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productActions } from "./store/product-slice";
import { userActions } from "./store/user-slice";
import { authActions } from "./store/auth-slice";
import useHttp from "./hooks/use-http";
import ShopPage from "./pages/ShopPage";
import EditProductPage from "./pages/EditProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import ChatPage from "./pages/ChatPage";

function App() {
  const { sendRequest, isLoading, error } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          const strPhoneNumber = data.user.phoneNumber.toString();
          const phoneNumber = `(${strPhoneNumber.slice(
            0,
            3
          )}) ${strPhoneNumber.slice(3, 6)}-${strPhoneNumber.slice(6, 10)}`;

          const user = {
            _id: data.user._id,
            profileImage: data.user.profileImage,
            coverImage: data.user.coverImage,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phoneNumber: phoneNumber,
          };
          const userProducts = data.user.products;

          dispatch(userActions.setUser(user));
          dispatch(userActions.setUserProducts(userProducts));
        }
      );

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
    }

    if (error) {
      dispatch(authActions.logOut());
      navigate("/auth/login");
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
  }, [sendRequest, token, error]);

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/login" element={<LogInPage />} />
        <Route path="/user/:userId" element={<UserDetailsPage />} />
        <Route path="user/chat" element={<ChatPage />} />
        <Route
          path="/shop"
          element={<ShopPage isLoading={isLoading} error={error} />}
        />
        <Route path="/shop/:productId" element={<ProductDetailsPage />} />
        <Route path="/add-product" element={<EditProductPage />} />
        <Route
          path="/update-product/:productId"
          element={<EditProductPage />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
