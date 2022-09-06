import { useState, Fragment } from "react";
import Shop from "../components/Shop/Shop";
import SideBar from "../components/SideBar/SideBar";

const ShopPage = (props) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [filters, setFilters] = useState();

  const handleToggleSideBar = () => {
    setShowSideBar((prevState) => {
      return !prevState;
    });
  };

  const handleAddFilter = (filter) => {
    if (!filters) {
      setFilters(filter);
    } else {
      setFilters({ ...filters, filter });
    }
  };

  const renderProducts = () => {
    if (!filters) {
      return props.products;
    }
    for (const product in props.products) {
    }
  };

  return (
    <Fragment>
      <SideBar
        showSideBar={showSideBar}
        onToggleSideBar={handleToggleSideBar}
        onAddFilter={handleAddFilter}
      />
      <Shop products={props.products} showSideBar={showSideBar} />
    </Fragment>
  );
};

export default ShopPage;
