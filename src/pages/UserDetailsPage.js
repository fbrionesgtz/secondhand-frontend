import { Fragment } from "react";
import UserProfile from "../components/User/UserProfile/UserProfile";
import UserProducts from "../components/User/UserProducts/UserProducts";

const UserDetailsPage = () => {
  return (
    <Fragment>
      <UserProfile />
      <UserProducts />
    </Fragment>
  );
};

export default UserDetailsPage;
