import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";

const User = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);

  return (
    <div
      className={styles.user}
      onClick={() => {
        navigate(`/user/${currentUser._id}`);
      }}
    >
      <div className={styles.userImg}>
        <img src={`http://localhost:8080/${currentUser.profileImage}`} />
      </div>
      <div className={styles.userName}>
        <h3>{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
      </div>
    </div>
  );
};

export default User;
