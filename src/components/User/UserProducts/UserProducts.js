import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";
import useHttp from "../../../hooks/use-http";
import ProductList from "../../Products/ProductList/ProductList";
import UserProductsHeader from "./UserProductsHeader/UserProductsHeader";

const UserProducts = () => {
  const { sendRequest, error } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProducts = useSelector((state) => state.user.userProducts);
  const token = useSelector((state) => state.auth.token);
  const search = useSelector((state) => state.user.search);
  const filters = useSelector((state) => state.user.filters);

  useEffect(() => {
    if (token) {
      sendRequest(
        {
          url: "http://localhost:8080/products/user-products",
          headers: { Authorization: token },
        },
        (products) => {
          dispatch(userActions.setUserProducts(products["products"]));
        }
      );

      if (error) {
        navigate("/auth/login");
      }
    }
  }, [sendRequest, token]);

  return (
    <section>
      <UserProductsHeader />
      <ProductList search={search} filters={filters} products={userProducts} />
    </section>
  );
};

export default UserProducts;
