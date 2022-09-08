import { useState, Fragment } from "react";
import Shop from "../components/Shop/Shop";
import SideBar from "../components/SideBar/SideBar";

const ShopPage = (props) => {
  const [filters, setFilters] = useState();

  const handleAddFilter = (filter) => {
    if (!filters) {
      setFilters(filter);
    } else {
      setFilters({ ...filters, filter });
    }
  };

  // const renderProducts = () => {
  //   if (!filters) {
  //     return props.products;
  //   }
  //   for (const product in props.products) {
  //   }
  // };

  return (
    <Fragment>
      <SideBar onAddFilter={handleAddFilter} />
      <Shop isLoading={props.isLoading} error={props.error} />
    </Fragment>
  );
};

export default ShopPage;
