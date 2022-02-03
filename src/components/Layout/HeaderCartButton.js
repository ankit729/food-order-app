import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const cartContext = useContext(CartContext);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={styles.badge}>{cartContext.numberOfItems}</span>
    </button>
  );
}

export default HeaderCartButton;
