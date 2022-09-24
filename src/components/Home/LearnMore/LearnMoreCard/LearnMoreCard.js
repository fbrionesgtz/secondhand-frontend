import { Transition } from "react-transition-group";
import { useSelector } from "react-redux";
import styles from "./LearnMoreCard.module.css";

const LearnMoreCard = (props) => {
  const transitionStyles = {
    entered: { opacity: "1", transform: "translateY(0)" },
    exited: { opacity: "0", transform: "translateY(50%)" },
  };

  return (
    <Transition in={props.in} timeout={0}>
      {(state) => (
        <div
          className={styles.learnMoreCard}
          style={{ ...transitionStyles[state] }}
        >
          {props.children}
        </div>
      )}
    </Transition>
  );
};

export default LearnMoreCard;
