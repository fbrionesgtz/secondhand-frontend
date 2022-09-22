import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import useInput from "../../../hooks/use-input";
import { toast } from "react-toastify";
import { authActions } from "../../../store/auth-slice";
import useHttp from "../../../hooks/use-http";
import Button from "../../UI/Button/Button";
import styles from "../Form.module.css";
import { useEffect } from "react";

const LogInForm = () => {
  const { sendRequest, error } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validEmail = (value) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const isEmpty = (value) => value.trim().length > 0;

  const {
    value: email,
    isValid: emailIsValid,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validEmail, "Please enter a valid email address.");

  const {
    value: password,
    isValid: passwordIsValid,
    valueInputChangeHandler: passwordChangeHandler,
    valueInputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isEmpty, "Please enter your password.");

  const handleLogIn = (e) => {
    e.preventDefault();

    if (!passwordIsValid || !emailIsValid) {
      return;
    }

    sendRequest(
      {
        url: "http://localhost:8080/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { email, password },
      },
      (data) => {
        dispatch(authActions.logIn(data.token));
        navigate("/shop");
        window.location.reload(false);
      }
    );

    resetEmail();
    resetPassword();
  };

  useEffect(() => {
    if (error) {
      toast.error("Wrong email or password.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  return (
    <div className={styles.form}>
      <h1>Sign in</h1>
      <form onSubmit={handleLogIn}>
        <div className={`${styles.control} ${!emailIsValid && styles.error}`}>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Enter email"
          />
        </div>
        <div
          className={`${styles.control} ${!passwordIsValid && styles.error}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
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
