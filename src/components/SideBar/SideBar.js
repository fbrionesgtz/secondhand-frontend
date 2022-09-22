import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation/Navigation";
import { uiActions } from "../../store/ui-slice";
import { Transition } from "react-transition-group";
import styles from "./SideBar.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { BiPlus } from "react-icons/bi";

const SideBar = (props) => {
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
      {!showSideBar && (
        <Transition in={!showSideBar} timeout={300}>
          {(state) => (
            <div
              className={styles.btnArrowForward}
              style={{ ...transitionStyles[state] }}
              onClick={handleShowSideBar}
            >
              <IoIosArrowForward />
            </div>
          )}
        </Transition>
      )}
      <Transition in={showSideBar} timeout={0}>
        {(state) => (
          <section
            className={styles.sideBar}
            style={{ ...transitionStyles[state] }}
          >
            <BiPlus className={styles.btnX} onClick={handleHideSideBar} />
            <Navigation />
          </section>
        )}
      </Transition>
    </Fragment>
  );
};

export default SideBar;
