import styles from "./ShopHeader.module.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdMessage } from "react-icons/md";

const ShopHeader = (props) => {
  const hanldeSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <div
      className={styles.shopHeader}
      style={!props.showSideBar ? { width: "100%" } : {}}
    >
      <div className={styles.search}>
        <input
          type="text"
          name="dashboard-search"
          id="dashboard-search"
          placeholder="Search by name, email, domain, or phone number"
          onChange={hanldeSearch}
        />
        <BiSearchAlt2 />
      </div>
      <div className={styles.btnMessage}>
        <div className={styles.messageIcon}>
          <MdMessage />
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
