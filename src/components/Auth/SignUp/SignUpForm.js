import { Link, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/use-input";
import { toast } from "react-toastify";
import useHttp from "../../../hooks/use-http";
import Button from "../../UI/Button/Button";
import styles from "../Form.module.css";

const SignUpForm = () => {
  const { sendRequest, error } = useHttp();
  const navigation = useNavigate();

  const isEmpty = (value) => value.trim().length > 0;

  const validImage = (value) =>
    value.type === "image/jpeg" ||
    value.type === "image/jpg" ||
    value.type === "image/png" ||
    value.type === "image/webp";

  const validPhoneNumber = (value) =>
    value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

  const validEmail = (value) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const validPassword = (value) =>
    value.trim().length !== 0 && value.length >= 8;

  const validConfirmPassword = (value) => value === password;

  const {
    value: profileImage,
    isValid: profileImageIsValid,
    valueInputChangeHandler: profileImageChangeHandler,
  } = useInput(
    validImage,
    "Please choose a jpeg, jpg, png, or webp file.",
    true
  );

  const {
    value: firstName,
    isValid: firstNameIsValid,
    valueInputChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isEmpty, "Please enter your first name.");

  const {
    value: lastName,
    isValid: lastNameIsValid,
    valueInputChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isEmpty, "Please enter your last name.");

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    valueInputChangeHandler: phoneNumberChangeHandler,
    valueInputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(validPhoneNumber, "Please enter a valid phone number.");

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
  } = useInput(validPassword, "Password must be at least 8 characters long.");

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    valueInputChangeHandler: confirmPasswordChangeHandler,
    valueInputBlurHandler: confirmPasswordBlurHandler,
    reset: resetconfirmPassword,
  } = useInput(validConfirmPassword, "Password does not match.");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      !profileImageIsValid ||
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !phoneNumberIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("image", profileImage);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);

    sendRequest(
      {
        url: "http://localhost:8080/auth/signup",
        method: "PUT",
        formData: formData,
      },
      () => {
        navigation("/auth/login");
      }
    );

    if (error) {
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

    resetFirstName();
    resetLastName();
    resetPhoneNumber();
    resetEmail();
    resetPassword();
    resetconfirmPassword();
  };

  return (
    <div className={styles.form}>
      <h1>Create an account</h1>
      <form onSubmit={handleSignUp}>
        <div
          className={`${styles.control} ${
            !profileImageIsValid && styles.error
          }`}
        >
          <label htmlFor="image">Profile picture</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={profileImageChangeHandler}
            className={styles.fileInput}
          />
        </div>
        <div
          className={`${styles.control} ${styles.block} ${
            !firstNameIsValid && styles.error
          }`}
        >
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            placeholder="Enter first name"
          />
        </div>
        <div
          className={`${styles.control} ${styles.block} ${styles.alignEnd} ${
            !lastNameIsValid && styles.error
          }`}
        >
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            placeholder="Enter last name"
          />
        </div>
        <div
          className={`${styles.control} ${!phoneNumberIsValid && styles.error}`}
        >
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="phone"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={phoneNumberChangeHandler}
            onBlur={phoneNumberBlurHandler}
            placeholder="Enter phone number"
          />
        </div>
        <div className={`${styles.control} ${!emailIsValid && styles.error}`}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
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
        <div
          className={`${styles.control} ${
            !confirmPasswordIsValid && styles.error
          }`}
        >
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            placeholder="Confirm password"
          />
        </div>
        <Button
          type="submit"
          class="primary"
          styles={{ width: "calc(100% - 1rem)" }}
          content="Sign up"
        />
      </form>
      <Link to="/auth/login">Already have an account</Link>
    </div>
  );
};

export default SignUpForm;
