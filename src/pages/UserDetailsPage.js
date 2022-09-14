import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { FaSignOutAlt } from "react-icons/fa";
import UserProfile from "../components/User/UserProfile/UserProfile";
import UserProducts from "../components/User/UserProducts/UserProducts";
import FloatingButton from "../components/UI/FloatingButton/FloatingButton";

const UserDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(authActions.logOut());
    navigate("/");
  };

  return (
    <Fragment>
      <UserProfile />
      <UserProducts />
      <FloatingButton onClick={handleSignOut}>
        <FaSignOutAlt />
      </FloatingButton>
    </Fragment>
  );
};

export default UserDetailsPage;
