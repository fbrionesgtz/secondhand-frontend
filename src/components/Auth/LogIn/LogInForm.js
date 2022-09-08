import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth-slice";
import { productActions } from "../../../store/product-slice";
import useHttp from "../../../hooks/use-http";

const LogInForm = () => {
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    sendRequest(
      {
        url: "http://localhost:8080/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { email, password },
      },
      (data) => {
        dispatch(authActions.setToken(data.token));
        dispatch(productActions.reloadProducts);
        navigate("/shop");
      }
    );
  };

  return (
    <form onSubmit={handleLogIn}>
      <input
        type="email"
        id="email"
        name="email"
        ref={emailRef}
        placeholder="Enter email"
      />
      <input
        type="password"
        id="password"
        name="password"
        ref={passwordRef}
        placeholder="Enter password"
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LogInForm;
