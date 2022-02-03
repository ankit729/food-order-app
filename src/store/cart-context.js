import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCart = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        items: state.items.concat(action.item),
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    case "REMOVE":
      break;
    default:
  }
  return defaultCart;
}

export function CartProvider(props) {
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCart);

  function addItem(item) {
    dispatchCart({ type: "ADD", item: item });
  }

  function removeItem(id) {
    dispatchCart({ type: "REMOVE", id: id });
  }

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        totalAmount: cart.totalAmount,
        addItem: addItem,
        removeItem: removeItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
