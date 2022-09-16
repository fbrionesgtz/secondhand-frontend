import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import Button from "../../UI/Button/Button";
import styles from "../Form.module.css";

const SignUpForm = () => {
  const { sendRequest } = useHttp();
  const navigation = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [profileImage, setProfileImage] = useState();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", profileImage);
    formData.append("firstName", firstNameRef.current.value);
    formData.append("lastName", lastNameRef.current.value);
    formData.append("phoneNumber", phoneRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);

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
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    } else if (!e.target.files) {
      setProfileImage(null);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Create an account</h1>
      <form onSubmit={handleSignUp}>
        <div className={styles.control}>
          <label for="image">Profile picture</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleProfileImageChange}
            className={styles.fileInput}
          />
        </div>
        <div className={`${styles.control} ${styles.block}`}>
          <label for="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            ref={firstNameRef}
            placeholder="Enter first name"
          />
        </div>
        <div className={`${styles.control} ${styles.block} ${styles.alignEnd}`}>
          <label for="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            ref={lastNameRef}
            placeholder="Enter last name"
          />
        </div>
        <div className={styles.control}>
          <label for="phoneNumber">Phone number</label>
          <input
            type="phone"
            id="phoneNumber"
            name="phoneNumber"
            ref={phoneRef}
            placeholder="Enter phone number"
          />
        </div>
        <div className={styles.control}>
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            placeholder="Enter email"
          />
        </div>
        <div className={styles.control}>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Enter password"
          />
        </div>
        <div className={styles.control}>
          <label for="password">Confirm password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
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
