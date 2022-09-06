import styles from "./User.module.css";

const User = () => {
  return (
    <div className={styles.user}>
      <div className={styles.userImg}>
        <img src="" />
      </div>
      <div className={styles.userName}>
        <h3>Kelly Cheng</h3>
      </div>
    </div>
  );
};

export default User;
