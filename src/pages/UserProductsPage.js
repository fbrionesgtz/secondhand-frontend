import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import useHttp from "../hooks/use-http";

const UserProductsPage = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userProducts = useSelector((state) => state.user.userProducts);

  return (
    <section>
      <ul>
        {userProducts.map((p) => (
          <li>{p.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default UserProductsPage;
