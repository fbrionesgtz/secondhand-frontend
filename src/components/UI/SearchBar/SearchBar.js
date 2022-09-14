import styles from "./SearchBar.module.css";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = (props) => {
  const hanldeSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        name="dashboard-search"
        id="dashboard-search"
        placeholder={props.placeholder}
        onChange={hanldeSearch}
      />
      <BiSearchAlt2 />
    </div>
  );
};

export default SearchBar;
