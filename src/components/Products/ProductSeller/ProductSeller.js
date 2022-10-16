import { MdEmail, MdPhone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import styles from "./ProductSeller.module.css";

const ProductSeller = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.sellerContainer}>
      <p>Seller information</p>
      <div className={styles.seller}>
        <div
          className={styles.sellerImg}
          onClick={() => {
            navigate(`/user/${props._id}`);
          }}
        >
          <img src={`http://localhost:8080/${props.profileImage}`} />
        </div>
        <div className={styles.sellerInfo}>
          <h3>{props.name}</h3>
          <div className={styles.contact}>
            <MdMessage />
            <Link to={`/user/chat?id=${props._id}`}>Send a message</Link>
          </div>
          <div className={styles.contact}>
            <MdEmail />
            <p>{props.email}</p>
          </div>
          <div className={styles.contact}>
            <MdPhone />
            <p>{props.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSeller;
