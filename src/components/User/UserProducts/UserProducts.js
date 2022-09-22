import { useSelector } from "react-redux";
import ProductList from "../../Products/ProductList/ProductList";
import UserProductsHeader from "./UserProductsHeader/UserProductsHeader";

const UserProducts = (props) => {
  const search = useSelector((state) => state.user.search);
  const filters = useSelector((state) => state.user.filters);

  return (
    <section>
      <UserProductsHeader />
      <ProductList
        search={search}
        filters={filters}
        products={props.products}
      />
    </section>
  );
};

export default UserProducts;
