import { useState } from "react";
import ProductList from "../Products/ProductList/ProductList";
import styles from "./Shop.module.css";
import ShopHeader from "./ShopHeader/ShopHeader";

const Shop = (props) => {
  const [search, setSearch] = useState("");

  const handleSearch = (search) => {
    setSearch(search);
  };

  return (
    <section
      className={styles.shop}
      style={!props.showSideBar ? { width: "100%", left: "0" } : {}}
    >
      <ShopHeader showSideBar={props.showSideBar} onSearch={handleSearch} />
      <ProductList
        products={props.products}
        search={search}
        showSideBar={props.showSideBar}
      />
    </section>
  );
};

export default Shop;
