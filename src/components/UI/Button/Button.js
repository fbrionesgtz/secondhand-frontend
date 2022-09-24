import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      style={{ ...props.styles }}
      className={`${styles.btn} ${
        props.class === "primary"
          ? styles.primary
          : props.class === "secondary"
          ? styles.secondary
          : props.class === "ghost" && styles.ghost
      }`}
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
};

export default Button;
