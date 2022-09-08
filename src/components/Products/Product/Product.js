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
      <div>
        <p>{`$${props.price}`}</p>
        <h1>{props.title}</h1>
      </div>
    </div>
  );
};

export default Product;
