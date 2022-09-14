import styles from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import { MdAddPhotoAlternate } from "react-icons/md";
import BackButton from "../../UI/Button/BackButton/BackButton";

const UserProfile = () => {
  const currUser = useSelector((state) => state.user.user);

  return (
    <section>
      <BackButton />
      <div className={styles.profileContainer}>
        <div className={styles.coverImage}>
          {!currUser.coverImage && <MdAddPhotoAlternate />}
          {currUser.coverImage && (
            <img src={`http://localhost:8080/${currUser.coverImage}`} />
          )}
        </div>
        <div className={styles.user}>
          <div className={styles.profileImage}>
            <img src={`http://localhost:8080/${currUser.profileImage}`} />
          </div>
          <h1>{`${currUser.firstName} ${currUser.lastName}`}</h1>
        </div>
        {/* <div className={styles.userContactContainer}>
          <p>Contact</p>
          <div className={styles.userContact}>
            <p>Email: {currUser.email}</p>
            <p>Phone number: {currUserr.phoneNumber}</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default UserProfile;
