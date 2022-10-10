import { useSelector } from "react-redux";
import { productActions } from "../../../store/product-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar/SearchBar";
import styles from "./ShopHeader.module.css";
import { MdMessage } from "react-icons/md";

const ShopHeader = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (search) => {
    dispatch(productActions.setSearch(search));
  };

  return (
    <div
      className={styles.shopHeader}
      style={!showSideBar ? { width: "100%" } : {}}
    >
      <SearchBar placeholder="Search products" onSearch={handleSearch} />
      <div
        className={styles.btnMessage}
        onClick={() => {
          navigate("/user/chat");
        }}
      >
        <div className={styles.messageIcon}>
          <MdMessage />
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
