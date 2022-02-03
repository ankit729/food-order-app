import { useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [amount, setAmount] = useState(1);

  function inputChangeHandler(value) {
    value = Math.max(value, 1);
    value = Math.min(value, 5);
    setAmount(value);
  }

  function submitFormHandler(event) {
    event.preventDefault();
    props.onAddToCart(amount);
  }

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
        }}
        value={amount}
        onChange={inputChangeHandler}
      />
      <button>+ Add</button>
    </form>
  );
}

export default MealItemForm;
