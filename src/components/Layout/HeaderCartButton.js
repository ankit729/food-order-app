import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const cartContext = useContext(CartContext);

  const numberOfItems = cartContext.items.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
}

export default HeaderCartButton;
