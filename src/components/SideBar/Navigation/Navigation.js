import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../store/product-slice";
import User from "../User/User";
import { Link } from "react-router-dom";
import { TbHanger } from "react-icons/tb";
import {
  MdDirectionsCar,
  MdOutlineDevices,
  MdPets,
  MdSportsSoccer,
} from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { CgGames } from "react-icons/cg";
import { GiForestCamp } from "react-icons/gi";
import { IoMdPricetags, IoMdPricetag } from "react-icons/io";
import { BiFilter } from "react-icons/bi";
import styles from "./Navigation.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.product.filters);

  const handleToggleFilter = (filter) => {
    if (filter.category && filters.categories.includes(filter.category)) {
      return dispatch(productActions.clearFilter(filter));
    }
    return dispatch(productActions.addFilter(filter));
  };

  const handlePriceRange = (e) => {
    const price = e.target.value;
    const name = e.target.name;

    dispatch(productActions.addFilter({ [name]: price }));
  };

  const handleClearFilters = () => {
    dispatch(productActions.clearAllFilters());
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.separator}>
          <User />
        </li>
        <li className={styles.separator}>
          <IoMdPricetags />
          <Link to="/add-product">Add Product</Link>
        </li>
        <li className={styles.title}>
          <p>Categories</p>
        </li>
        <li
          className={
            filters.categories.includes("Vehicles") ? styles.active : ""
          }
          onClick={handleToggleFilter.bind(null, { category: "Vehicles" })}
        >
          <MdDirectionsCar />
          <p>Vehicles</p>
        </li>
        <li
          className={
            filters.categories.includes("Clothing") ? styles.active : ""
          }
          onClick={handleToggleFilter.bind(null, { category: "Clothing" })}
        >
          <TbHanger />
          <p>Clothing</p>
        </li>
        <li
          className={
            filters.categories.includes("Electronics") ? styles.active : ""
          }
          onClick={handleToggleFilter.bind(null, { category: "Electronics" })}
        >
          <MdOutlineDevices />
          <p>Electronics</p>
        </li>
        <li
          className={
            filters.categories.includes("Home Goods") ? styles.active : ""
          }
          onClick={handleToggleFilter.bind(null, { category: "Home Goods" })}
        >
          <IoHome />
          <p>Home Goods</p>
        </li>
        <li
          className={
            filters.categories.includes("Toys & Games") ? styles.active : ""
          }
          onClick={handleToggleFilter.bind(null, { category: "Toys & Games" })}
        >
          <CgGames />
          <p>Toys & Games</p>
        </li>
        <li
          className={
            filters.categories.includes("Pet Supplies") ? styles.active : ""
          }
          onClick={handleToggleFilter.bind(null, { category: "Pet Supplies" })}
        >
          <MdPets />
          <p>Pet Supplies</p>
        </li>
        <li
          className={
            filters.categories.includes("Sports Supplies") ? styles.active : ""
          }
          onClick={handleToggleFilter.bind(null, {
            category: "Sports Supplies",
          })}
        >
          <MdSportsSoccer />
          <p>Sports Supplies</p>
        </li>
        <li
          className={`${styles.separator} 
            ${filters.categories.includes("Outdoors") ? styles.active : ""}`}
          onClick={handleToggleFilter.bind(null, { category: "Outdoors" })}
        >
          <GiForestCamp />
          <p>Outdoors</p>
        </li>
        <li className={styles.title}>
          <p>Price</p>
        </li>
        <li className={`${styles.separator} ${styles.price}`}>
          <input
            type="number"
            name="min"
            min="0"
            placeholder="min"
            onBlur={handlePriceRange}
          />
          <p>to</p>
          <input
            type="number"
            name="max"
            min="0"
            placeholder="max"
            onBlur={handlePriceRange}
          />
        </li>
        <li onClick={handleClearFilters}>
          <BiFilter />
          <p>Clear Filters</p>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
