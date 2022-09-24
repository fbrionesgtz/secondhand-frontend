import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { productActions } from "../store/product-slice";
import { userActions } from "../store/user-slice";
import { FaSignOutAlt } from "react-icons/fa";
import useHttp from "../hooks/use-http";
import UserProfile from "../components/User/UserProfile/UserProfile";
import UserProducts from "../components/User/UserProducts/UserProducts";
import FloatingButton from "../components/UI/Button/FloatingButton/FloatingButton";
import Loader from "../components/UI/Loader/Loader";

const UserDetailsPage = () => {
  const { sendRequest, isLoading, error } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.user.user);
  const userProducts = useSelector((state) => state.user.userProducts);
  const owner = useSelector((state) => state.product.owner);
  const token = useSelector((state) => state.auth.token);
  const { userId } = useParams();

  const handleSignOut = () => {
    dispatch(userActions.clearUser());
    dispatch(productActions.clearProducts());
    dispatch(authActions.logOut());
    navigate("/");
  };

  useEffect(() => {
    sendRequest(
      {
        url: `http://localhost:8080/auth/user/${
          userId !== currUser._id ? userId : ""
        }`,
        headers: { Authorization: token },
      },
      (data) => {
        const strPhoneNumber = data.user.phoneNumber.toString();
        const phoneNumber = `(${strPhoneNumber.slice(
          0,
          3
        )}) ${strPhoneNumber.slice(3, 6)}-${strPhoneNumber.slice(6, 10)}`;

        const user = {
          _id: data.user._id,
          profileImage: data.user.profileImage,
          coverImage: data.user.coverImage,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phoneNumber: phoneNumber,
          products: data.user.products,
        };

        if (userId !== currUser._id) {
          dispatch(productActions.setOwner(user));
        } else {
          dispatch(userActions.setUserProducts(user.products));
        }
      }
    );
  }, []);

  return (
    <Fragment>
      {error && <p>Something went wrong.</p>}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <Fragment>
          <UserProfile
            user={
              userId !== currUser._id
                ? {
                    profileImage: owner.profileImage,
                    coverImage: owner.coverImage,
                    firstName: owner.firstName,
                    lastName: owner.lastName,
                    email: owner.email,
                    phoneNumber: owner.phoneNumber,
                  }
                : currUser
            }
          />
          <UserProducts
            products={
              userId !== currUser._id && owner.products
                ? owner.products
                : userProducts
            }
          />
          {userId === currUser._id && (
            <FloatingButton onClick={handleSignOut}>
              <FaSignOutAlt />
            </FloatingButton>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserDetailsPage;
