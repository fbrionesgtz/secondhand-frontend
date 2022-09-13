import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import useHttp from "../hooks/use-http";

const UserDetailsPage = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:8080/products/user-products",
        headers: { Authorization: token },
      },
      (products) => {
        dispatch(userActions.setUserProducts(products));
        console.log(products);
      }
    );
  }, [sendRequest]);

  return (
    <section>
      <img src={`http://localhost:8080/${currUser.profileImage}`} />
      <h1>{`${currUser.firstName} ${currUser.lastName}`}</h1>
      <p>{currUser.email}</p>
      <p>{currUser.phoneNumber}</p>
      <p>{currUser.email}</p>
    </section>
  );
};

export default UserDetailsPage;
