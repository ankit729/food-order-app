import styles from "./CartItems.module.css";

function CartItems(props) {
  return (
    <ul className={styles["cart-items"]}>
      {props.items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

export default CartItems;
