import styles from "./Product.module.css";

const Product = (props) => {
  const hanldeProductClick = () => {
    props.onClick();
  };

  return (
    <div onClick={hanldeProductClick} className={styles.product}>
      <div className={styles.productImg}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(http://localhost:8080/${props.productImage})`,
          }}
        />
      </div>
      <div className={styles.productContent}>
        <h1>{`$${props.price}`}</h1>
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default Product;
