import { Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { uiActions } from "../../../store/ui-slice";
import { userActions } from "../../../store/user-slice";
import useHttp from "../../../hooks/use-http";
import BackButton from "../../UI/Button/BackButton/BackButton";
import Modal from "../../UI/Modal/Modal";
import {
  MdAddPhotoAlternate,
  MdPhotoSizeSelectActual,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { RiImageEditFill, RiContactsFill } from "react-icons/ri";
import styles from "./UserProfile.module.css";
import { toast } from "react-toastify";

const UserProfile = (props) => {
  const coverImageRef = useRef();
  const { sendRequest, error } = useHttp();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currUser = useSelector((state) => state.user.user);
  const coverImageHover = useSelector((state) => state.ui.isCoverImageHover);
  const profileImageHover = useSelector(
    (state) => state.ui.isProfileImageHover
  );
  const showContactInfo = useSelector((state) => state.ui.isUserContactShown);
  const token = useSelector((state) => state.auth.token);

  const validImage = (value) =>
    value.type === "image/jpeg" ||
    value.type === "image/jpg" ||
    value.type === "image/png" ||
    value.type === "image/webp";

  const handleUpdateImage = () => {
    const coverImage = coverImageRef.current.files[0];

    if (!validImage(coverImage)) {
      toast.error("Please choose a jpeg, jpg, png, or webp file.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      coverImageRef.current.value = null;
    }

    if (validImage(coverImage) && token) {
      const formData = new FormData();
      formData.append("image", coverImage);
      sendRequest(
        {
          url: "http://localhost:8080/auth/user",
          method: "PUT",
          headers: { Authorization: token },
          formData: formData,
        },
        (res) => {
          dispatch(
            userActions.setUser({
              ...currUser,
              coverImage: res.user.coverImage,
            })
          );
          toast.success("Cover image updated.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );

      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <section>
      <BackButton />
      <div className={styles.profileContainer}>
        <div
          className={styles.coverImage}
          onMouseEnter={() => {
            dispatch(uiActions.hoverCoverImage());
          }}
          onMouseLeave={() => {
            dispatch(uiActions.hoverLeaveCoverImage());
          }}
        >
          <input
            type="file"
            id="image"
            name="image"
            className={styles.coverImageInput}
            ref={coverImageRef}
            onChange={handleUpdateImage}
          />
          {userId === currUser._id ? (
            !props.user.coverImage ? (
              <MdAddPhotoAlternate
                onClick={() => {
                  coverImageRef.current.click();
                }}
              />
            ) : (
              <Fragment>
                <div
                  className={styles.img}
                  style={{
                    backgroundImage: `url(http://localhost:8080/${props.user.coverImage})`,
                  }}
                />
                {coverImageHover && (
                  <RiImageEditFill
                    onClick={() => {
                      coverImageRef.current.click();
                    }}
                  />
                )}
              </Fragment>
            )
          ) : !props.user.coverImage ? (
            <MdPhotoSizeSelectActual />
          ) : (
            <div
              className={styles.img}
              style={{
                backgroundImage: `url(http://localhost:8080/${props.user.coverImage})`,
              }}
            />
          )}
        </div>
        <div className={styles.user}>
          <div
            className={styles.profileImage}
            data-name={`${props.user.firstName} ${props.user.lastName}`}
            onMouseEnter={() => {
              dispatch(uiActions.hoverProfileImage());
            }}
            onMouseLeave={() => {
              dispatch(uiActions.hoverLeaveProfileImage());
            }}
          >
            <img src={`http://localhost:8080/${props.user.profileImage}`} />
            {profileImageHover && (
              <RiContactsFill
                className={styles.contactIcon}
                onClick={() => {
                  dispatch(uiActions.showUserContact());
                }}
              />
            )}
          </div>
        </div>
        {showContactInfo && (
          <Modal
            onClickBackdrop={() => {
              dispatch(uiActions.hideUserContact());
            }}
          >
            <div className={styles.userContactContainer}>
              <h1>Contact info</h1>
              <div className={styles.userContact}>
                <div>
                  <MdEmail />
                  <p>{props.user.email}</p>
                </div>
                <div>
                  <MdPhone />
                  <p>{props.user.phoneNumber}</p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
