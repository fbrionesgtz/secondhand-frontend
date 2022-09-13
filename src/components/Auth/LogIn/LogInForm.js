import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authActions } from "../../../store/auth-slice";
import { productActions } from "../../../store/product-slice";
import useHttp from "../../../hooks/use-http";
import Button from "../../UI/Button/Button";
import styles from "../Form.module.css";

const LogInForm = () => {
  const { sendRequest, isLoading, error } = useHttp();
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
        dispatch(authActions.logIn(data.token));
        dispatch(productActions.reloadProducts);
        navigate("/shop");
      }
    );
  };

  return (
    <div className={styles.form}>
      <h1>Sign in</h1>
      <form onSubmit={handleLogIn}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            placeholder="Enter email"
          />
        </div>
        <div className={styles.control}>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Enter password"
          />
        </div>
        <Button
          type="submit"
          class="primary"
          styles={{ width: "calc(100% - 1rem)" }}
          content="Log in"
        />
      </form>
      <Link to="/auth/signup">Create a new account</Link>
    </div>
  );
};

export default LogInForm;
