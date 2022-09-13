import styles from "./GrayBackground.module.css";

const GrayBackground = (props) => {
  return <section className={styles.background}>{props.children}</section>;
};

export default GrayBackground;
