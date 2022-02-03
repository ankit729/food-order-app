import styles from "./Input.module.css";

function Input(props) {
  function inputChangeHandler(event) {
    props.onChange(+event.target.value);
  }

  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        {...props.input}
        value={props.value}
        onChange={inputChangeHandler}
      />
    </div>
  );
}

export default Input;
