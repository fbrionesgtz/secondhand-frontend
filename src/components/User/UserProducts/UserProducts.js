import { useSelector } from "react-redux";
import ProductList from "../../Products/ProductList/ProductList";
import UserProductsHeader from "./UserProductsHeader/UserProductsHeader";

const UserProducts = () => {
  const userProducts = useSelector((state) => state.user.userProducts);
  const search = useSelector((state) => state.user.search);
  const filters = useSelector((state) => state.user.filters);

  return (
    <section>
      <UserProductsHeader />
      <ProductList search={search} filters={filters} products={userProducts} />
    </section>
  );
};

export default UserProducts;
