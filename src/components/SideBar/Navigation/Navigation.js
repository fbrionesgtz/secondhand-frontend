import User from "../User/User";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { BsPersonFill, BsPlayCircle } from "react-icons/bs";
import { BiTargetLock } from "react-icons/bi";
import {
  MdOutlineBusiness,
  MdOutlineDoubleArrow,
  MdEmail,
  MdInsertChart,
  MdOutlineLockOpen,
} from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import { RiTaskFill } from "react-icons/ri";

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
        <li>
          <Link to="#">My Products</Link>
        </li>
        <li className={styles.separator}>
          <Link to="/add-product">Add Product</Link>
        </li>
        <li className={styles.title}>
          <p>Categories</p>
        </li>
        <li>
          <BiTargetLock />
          <Link
            to="#"
            onClick={handleAddFilter.bind(null, { category: "Vehicle" })}
          >
            Vehicles
          </Link>
        </li>
        <li className={styles.active}>
          <BsPersonFill />
          <a href="#">Clothing</a>
        </li>
        <li>
          <MdOutlineBusiness />
          <a href="#">Electronics</a>
        </li>
        <li>
          <MdOutlineDoubleArrow />
          <a href="#">Home Goods</a>
        </li>
        <li>
          <IoMdBriefcase />
          <a href="#">Toys & Games</a>
        </li>
        <li>
          <RiTaskFill />
          <a href="#">Pet Supplies</a>
        </li>
        <li>
          <BsPlayCircle />
          <a href="#">Sports Supplies</a>
        </li>
        <li>
          <BsPlayCircle />
          <a href="#">Outdoors</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
