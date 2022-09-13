import styles from "./SecondhandLogo.module.css";
import { BsArrowRepeat } from "react-icons/bs";
import { IoStorefrontSharp } from "react-icons/io5";

const SecondhandLogo = () => {
  return (
    <div className={styles.secondhandLogo}>
      <BsArrowRepeat />
      <IoStorefrontSharp />
    </div>
  );
};

export default SecondhandLogo;
