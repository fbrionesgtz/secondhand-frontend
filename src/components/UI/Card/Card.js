import styles from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={styles.card} style={{ ...props.styles }}>
      {props.children}
    </div>
  );
};

export default Card;
