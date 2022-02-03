import { useContext } from "react";
import BinIcon from "../../assets/BinIcon";
import CartContext from "../../store/cart-context";
import styles from "./CartItem.module.css";

function CartItem(props) {
  const cartContext = useContext(CartContext);

  const price = props.price.toFixed(2);

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>${price}</span>
          <span className={styles.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          style={{ border: "none" }}
          onClick={() => cartContext.removeItem(props.id)}
        >
          <span className={styles.icon}>
            <BinIcon />
          </span>
        </button>
        <button
          onClick={() =>
            cartContext.updateItemAmount({
              id: props.id,
              name: props.name,
              amount: -1,
              price: props.price,
            })
          }
        >
          -
        </button>
        <button
          onClick={() => {
            cartContext.updateItemAmount({
              id: props.id,
              name: props.name,
              amount: 1,
              price: props.price,
            });
          }}
        >
          +
        </button>
      </div>
    </li>
  );
}

export default CartItem;
