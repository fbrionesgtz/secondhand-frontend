import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      style={{ ...props.styles }}
      className={
        props.class === "primary"
          ? styles.primary
          : props.class === "secondary" && styles.secondary
      }
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
};

export default Button;
