import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Transition } from "react-transition-group";
import styles from "./SideBar.module.css";
import Navigation from "./Navigation/Navigation";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { BiPlus } from "react-icons/bi";

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  const dispatch = useDispatch();
  const transitionStyles = {
    entered: { transform: "translateX(0)" },
    exited: { transform: "translateX(-100%)" },
  };

  const handleHideSideBar = () => {
    dispatch(uiActions.hideSideBar());
  };

  const handleShowSideBar = () => {
    dispatch(uiActions.showSideBar());
  };

  return (
    <Fragment>
      {!isOpen && (
        <Transition in={!isOpen} timeout={0}>
          {(state) => (
            <div
              className={styles.btnArrowForward}
              style={{ ...transitionStyles[state] }}
            >
              <IoIosArrowForward onClick={handleShowSideBar} />
            </div>
          )}
        </Transition>
      )}
      <Transition
        in={showSideBar}
        timeout={0}
        onEntered={() => {
          setIsOpen(true);
        }}
        onExited={() => {
          setIsOpen(false);
        }}
      >
        {(state) => (
          <section
            className={styles.sideBar}
            style={{ ...transitionStyles[state] }}
          >
            <BiPlus className={styles.btnX} onClick={handleHideSideBar} />
            <Navigation onAddFilter={props.onAddFilter} />
            <div className={styles.logo}>
              <img src="" height="110%" width="110%" />
            </div>
            <BsThreeDots className={styles.btnThreeDots} />
          </section>
        )}
      </Transition>
    </Fragment>
  );
};

export default SideBar;
