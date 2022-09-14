import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import useHttp from "../../../hooks/use-http";
import BackButton from "../../UI/Button/BackButton/BackButton";
import Modal from "../../UI/Modal/Modal";
import { MdAddPhotoAlternate, MdEmail, MdPhone } from "react-icons/md";
import { RiImageEditFill, RiContactsFill } from "react-icons/ri";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const coverImageRef = useRef();
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.user);
  const coverImageHover = useSelector((state) => state.ui.isCoverImageHover);
  const profileImageHover = useSelector(
    (state) => state.ui.isProfileImageHover
  );
  const showContactInfo = useSelector((state) => state.ui.isUserContactShown);
  const token = useSelector((state) => state.auth.token);

  const handleUpdateImage = () => {
    const coverImage = coverImageRef.current.files[0];

    if (coverImage && token) {
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
          console.log(res);
        }
      );
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
          {!currUser.coverImage && (
            <MdAddPhotoAlternate
              onClick={() => {
                coverImageRef.current.click();
              }}
            />
          )}
          {currUser.coverImage && (
            <Fragment>
              <div
                className={styles.img}
                style={{
                  backgroundImage: `url(http://localhost:8080/${currUser.coverImage})`,
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
          )}
        </div>
        <div className={styles.user}>
          <div
            className={styles.profileImage}
            data-name={`${currUser.firstName} ${currUser.lastName}`}
            onMouseEnter={() => {
              dispatch(uiActions.hoverProfileImage());
            }}
            onMouseLeave={() => {
              dispatch(uiActions.hoverLeaveProfileImage());
            }}
          >
            <img src={`http://localhost:8080/${currUser.profileImage}`} />
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
                  <p>{currUser.email}</p>
                </div>
                <div>
                  <MdPhone />
                  <p>{currUser.phoneNumber}</p>
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
