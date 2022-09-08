import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";

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
    <form onSubmit={handleSignUp}>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleProfileImageChange}
      />
      <input
        type="text"
        id="firstName"
        name="firstName"
        ref={firstNameRef}
        placeholder="Enter first name"
      />
      <input
        type="text"
        id="lastName"
        name="lastName"
        ref={lastNameRef}
        placeholder="Enter last name"
      />
      <input
        type="phone"
        id="phoneNumber"
        name="phoneNumber"
        ref={phoneRef}
        placeholder="Enter phone number"
      />
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

      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
