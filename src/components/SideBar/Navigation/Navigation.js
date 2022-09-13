import User from "../User/User";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { BsTagFill } from "react-icons/bs";
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

const Nav = (props) => {
  const handleAddFilter = (filter) => {
    props.addFilter(filter);
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
        <li>
          <MdDirectionsCar />
          <Link
            to="#"
            onClick={handleAddFilter.bind(null, { category: "Vehicle" })}
          >
            Vehicles
          </Link>
        </li>
        <li className={styles.active}>
          <TbHanger />
          <a href="#">Clothing</a>
        </li>
        <li>
          <MdOutlineDevices />
          <a href="#">Electronics</a>
        </li>
        <li>
          <IoHome />
          <a href="#">Home Goods</a>
        </li>
        <li>
          <CgGames />
          <a href="#">Toys & Games</a>
        </li>
        <li>
          <MdPets />
          <a href="#">Pet Supplies</a>
        </li>
        <li>
          <MdSportsSoccer />
          <a href="#">Sports Supplies</a>
        </li>
        <li>
          <GiForestCamp />
          <a href="#">Outdoors</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
