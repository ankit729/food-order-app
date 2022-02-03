import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItems from "./CartItems";

function Cart(props) {
  const cartItems = [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }]
    .filter((item) => item.amount > 0)
    .map((item) => item.name);

  return (
    <Modal onClose={props.onClose}>
      <CartItems items={cartItems} />
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>$0</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
