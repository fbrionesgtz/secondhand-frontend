import { Fragment, useState } from "react";
import { Transition } from "react-transition-group";
import styles from "./SideBar.module.css";
import Navigation from "./Navigation/Navigation";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { BiPlus } from "react-icons/bi";
import User from "./User/User";

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const transitionStyles = {
    entered: { transform: "translateX(0)" },
    exited: { transform: "translateX(-100%)" },
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
              <IoIosArrowForward onClick={props.onToggleSideBar} />
            </div>
          )}
        </Transition>
      )}
      <Transition
        in={props.showSideBar}
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
            <BiPlus className={styles.btnX} onClick={props.onToggleSideBar} />
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
