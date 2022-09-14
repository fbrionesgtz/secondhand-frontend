import { useSelector } from "react-redux";
import ProductList from "../Products/ProductList/ProductList";
import styles from "./Shop.module.css";
import ShopHeader from "./ShopHeader/ShopHeader";

const Shop = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const products = useSelector((state) => state.product.products);
  const search = useSelector((state) => state.product.search);
  const filters = useSelector((state) => state.product.filters);

  return (
    <section
      className={styles.shop}
      style={!showSideBar ? { width: "100%", left: "0" } : {}}
    >
      <ShopHeader />
      <ProductList
        products={products}
        search={search}
        filters={filters}
        isLoading={props.isLoading}
        error={props.error}
      />
    </section>
  );
};

export default Shop;
