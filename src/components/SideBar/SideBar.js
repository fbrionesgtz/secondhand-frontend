import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation/Navigation";
import SecondhandLogo from "../UI/Logo/SecondhandLogo";
import { uiActions } from "../../store/ui-slice";
import { Transition } from "react-transition-group";
import styles from "./SideBar.module.css";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { BiPlus } from "react-icons/bi";

const SideBar = (props) => {
  const showSideBar = useSelector((state) => state.ui.isSideBarShown);
  // const [isOpen, setIsOpen] = useState();
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
            >
              <IoIosArrowForward onClick={handleShowSideBar} />
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
            <Navigation onAddFilter={props.onAddFilter} />
            <div className={styles.logo}>
              <SecondhandLogo />
            </div>
          </section>
        )}
      </Transition>
    </Fragment>
  );
};

export default SideBar;
