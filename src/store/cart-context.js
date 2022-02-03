import { createContext, useContext, useReducer } from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

const CartContext = createContext({
  items: [],
  numberOfItems: 0,
  totalAmount: 0,
  addItem: (item) => {},
});

const defaultCart = {
  items: [],
  numberOfItems: 0,
  totalAmount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "UPDATE_AMOUNT":
      const updatedNumberOfItems = state.numberOfItems + action.item.amount;
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      let updatedItems;
      const index = state.items.findIndex((item) => item.id === action.item.id);
      if (index > -1) {
        updatedItems = [...state.items];
        updatedItems[index].amount += action.item.amount;
        if (updatedItems[index].amount === 0) {
          updatedItems.splice(index, 1);
        }
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        numberOfItems: updatedNumberOfItems,
        totalAmount: updatedTotalAmount,
      };
    default:
  }
  return defaultCart;
}

export function CartProvider(props) {
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCart);

  function updateItemAmount(item) {
    dispatchCart({ type: "UPDATE_AMOUNT", item: item });
  }

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        numberOfItems: cart.numberOfItems,
        totalAmount: cart.totalAmount,
        updateItemAmount: updateItemAmount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
