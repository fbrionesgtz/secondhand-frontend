import { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "../Products/ProductList/ProductList";
import styles from "./Shop.module.css";
import ShopHeader from "./ShopHeader/ShopHeader";

const Shop = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const [search, setSearch] = useState("");

  const handleSearch = (search) => {
    setSearch(search);
  };

  return (
    <section
      className={styles.shop}
      style={!showSideBar ? { width: "100%", left: "0" } : {}}
    >
      <ShopHeader onSearch={handleSearch} />
      <ProductList
        isLoading={props.isLoading}
        error={props.error}
        search={search}
      />
    </section>
  );
};

export default Shop;
