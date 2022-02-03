import CartItem from "./CartItem";
import styles from "./CartItems.module.css";

function CartItems(props) {
  return (
    <ul className={styles["cart-items"]}>
      {props.items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default CartItems;
