import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.btnArrowBack}
      onClick={() => {
        navigate("/shop");
      }}
    >
      <IoIosArrowBack />
    </div>
  );
};

export default BackButton;
