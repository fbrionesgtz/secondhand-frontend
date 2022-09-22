import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Shop from "../components/Shop/Shop";
import SideBar from "../components/SideBar/SideBar";

const ShopPage = (props) => {
  return (
    <Fragment>
      <SideBar />
      <Shop isLoading={props.isLoading} error={props.error} />
    </Fragment>
  );
};

export default ShopPage;
