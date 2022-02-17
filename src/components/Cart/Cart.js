import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItems from "./CartItems";
import Checkout from "./Checkout";

function Cart(props) {
  const cartContext = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [error, setError] = useState(null);

  function orderClickHandler() {
    setShowForm(true);
  }

  async function orderSubmitHandler(userData) {
    setSubmitSuccessful(false);
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-food-order-app-8d1fe-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartContext.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      cartContext.resetCart();
      setSubmitSuccessful(true);
    } catch (err) {
      setError(err.message);
    }
    setIsSubmitting(false);
  }

  return (
    <Modal onClose={props.onClose}>
      {error ? (
        <Fragment>
          <p className={styles.error}>{error}</p>
          <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={props.onClose}>
              Close
            </button>
          </div>
        </Fragment>
      ) : isSubmitting ? (
        <p>Sending order data...</p>
      ) : submitSuccessful ? (
        <Fragment>
          <p>Order Submitted Successfully!</p>
          <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={props.onClose}>
              Close
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <CartItems items={cartContext.items} />
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>${cartContext.totalAmount.toFixed(2)}</span>
          </div>
          {showForm ? (
            <Checkout onCancel={props.onClose} onSubmit={orderSubmitHandler} />
          ) : (
            <div className={styles.actions}>
              <button className={styles["button--alt"]} onClick={props.onClose}>
                Close
              </button>
              {cartContext.items.length > 0 && (
                <button className={styles.button} onClick={orderClickHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </Fragment>
      )}
    </Modal>
  );
}

export default Cart;
