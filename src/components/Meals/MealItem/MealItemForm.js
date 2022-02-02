import { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

function MealItemForm(props) {
  const context = useContext(CartContext);
  const [amount, setAmount] = useState(1);
  function submitFormHandler(event) {
    event.preventDefault();
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
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
}

export default MealItemForm;
