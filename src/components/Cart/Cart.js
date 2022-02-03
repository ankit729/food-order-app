import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItems from "./CartItems";

function Cart(props) {
  const cartContext = useContext(CartContext);

  return (
    <Modal onClose={props.onClose}>
      <CartItems items={cartContext.items} />
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartContext.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {cartContext.items.length > 0 && (
          <button className={styles.button}>Order</button>
        )}
      </div>
    </Modal>
  );
}

export default Cart;
