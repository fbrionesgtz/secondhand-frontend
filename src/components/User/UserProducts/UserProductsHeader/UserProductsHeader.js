import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../store/user-slice";
import SearchBar from "../../../UI/SearchBar/SearchBar";
import { ImCross } from "react-icons/im";
import styles from "./UserProductsHeader.module.css";

const UserProductsHeader = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.user.filters);

  const handleSearch = (search) => {
    dispatch(userActions.setSearch(search));
  };

  const handleAddFilter = (filter) => {
    return dispatch(userActions.addFilter(filter));
  };

  const handleClearFilter = (filter) => {
    return dispatch(userActions.clearFilter(filter));
  };

  return (
    <div>
      <div className={styles.userProductsHeader}>
        <SearchBar placeholder="Search my products" onSearch={handleSearch} />
        <div className={styles.categories}>
          <select
            id="select-categories"
            name="select-categories"
            onChange={(e) => {
              handleAddFilter({ category: e.target.value });
            }}
          >
            <option value="">Categories</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Sports Supplies">Sports Supplies</option>
            <option value="Outdoors">Outdoors</option>
          </select>
        </div>
      </div>
      {filters.categories.length > 0 && (
        <div className={styles.filters}>
          {filters.categories.map((category) => (
            <div className={styles.filter}>
              <div
                className={styles.btnX}
                onClick={handleClearFilter.bind(null, { category: category })}
              >
                <ImCross />
              </div>
              <div>{category}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProductsHeader;
