import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

function isEmpty(value) {
  return value.trim().length === 0;
}

function isSixChars(value) {
  return value.trim().length === 6;
}

function Checkout(props) {
  const [valid, setValid] = useState({
    name: true,
    address: true,
    city: true,
    state: true,
    pincode: true,
  });
  const nameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const pincodeRef = useRef();

  function formSubmitHandler(event) {
    event.preventDefault();
    const nameValid = !isEmpty(nameRef.current.value);
    const addressValid = !isEmpty(addressRef.current.value);
    const cityValid = !isEmpty(cityRef.current.value);
    const stateValid = !isEmpty(stateRef.current.value);
    const pincodeValid = isSixChars(pincodeRef.current.value);

    const formValid =
      nameValid && addressValid && cityValid && stateValid && pincodeValid;
    setValid({
      name: nameValid,
      address: addressValid,
      city: cityValid,
      state: stateValid,
      pincode: pincodeValid,
    });

    if (formValid) {
      props.onSubmit({
        name: nameRef.current.value,
        address: addressRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        pincode: pincodeRef.current.value,
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div className={`${styles.control} ${valid.name ? "" : styles.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!valid.name && <p>Please enter a valid Name!</p>}
      </div>

      <div
        className={`${styles.control} ${valid.address ? "" : styles.invalid}`}
      >
        <label htmlFor="address">Address</label>
        <input ref={addressRef} type="text" id="address" />
        {!valid.address && <p>Please enter a valid Address!</p>}
      </div>

      <div className={`${styles.control} ${valid.city ? "" : styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!valid.city && <p>Please enter a valid City!</p>}
      </div>

      <div className={`${styles.control} ${valid.state ? "" : styles.invalid}`}>
        <label htmlFor="state">State</label>
        <input ref={stateRef} type="text" id="state" />
        {!valid.state && <p>Please enter a valid State!</p>}
      </div>

      <div
        className={`${styles.control} ${valid.pincode ? "" : styles.invalid}`}
      >
        <label htmlFor="pincode">PIN Code</label>
        <input ref={pincodeRef} type="text" id="pincode" />
        {!valid.pincode && <p>Please enter a valid PIN Code!</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
