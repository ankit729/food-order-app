import { useContext, useEffect, useState } from "react";
import CartIcon from "../../assets/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const cartContext = useContext(CartContext);

  const [highlightButton, setHighlightButton] = useState(true);

  useEffect(() => {
    setHighlightButton(true);
    const timer = setTimeout(() => {
      setHighlightButton(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button
      className={`${styles.button} ${highlightButton && styles.bump}`}
      onClick={props.onClick}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={styles.badge}>{cartContext.numberOfItems}</span>
    </button>
  );
}

export default HeaderCartButton;
