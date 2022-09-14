import { useDispatch } from "react-redux";
import { userActions } from "../../../../store/user-slice";
import SearchBar from "../../../UI/SearchBar/SearchBar";
import styles from "./UserProductsHeader.module.css";

const UserProductsHeader = (props) => {
  const dispatch = useDispatch();

  const handleSearch = (search) => {
    dispatch(userActions.setSearch(search));
  };

  return (
    <div className={styles.userProductsHeader}>
      <SearchBar placeholder="Search products" onSearch={handleSearch} />
      <div className={styles.filter}>
        <select>
          <option>Categories</option>
          <option>Vehicles</option>
          <option>Clothing</option>
          <option>Electronics</option>
          <option>Home Goods</option>
          <option>Toys & Games</option>
          <option>Pet Supplies</option>
          <option>Sports Supplies</option>
          <option>Outdoors</option>
        </select>
      </div>
    </div>
  );
};

export default UserProductsHeader;
