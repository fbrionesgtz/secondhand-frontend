import styles from "./FloatingButton.module.css";

const FloatingButton = (props) => {
  return (
    <div
      className={styles.floatingBtn}
      style={{ ...props.styles }}
      onClick={props.onClick}
    >
      <div className={styles.icon}>{props.children}</div>
    </div>
  );
};

export default FloatingButton;
