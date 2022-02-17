import { createContext, useReducer } from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

const defaultCart = {
  items: [],
  numberOfItems: 0,
  totalAmount: 0,
};

const CartContext = createContext({
  ...defaultCart,
  updateItemAmount: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "UPDATE_ITEM_AMOUNT") {
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
  }

  if (action.type === "REMOVE_ITEM") {
    const index = state.items.findIndex((item) => item.id === action.id);
    if (index === -1) {
      return state;
    }
    const removedItem = state.items[index];
    const updatedItems = [...state.items];
    updatedItems.splice(index, 1);

    return {
      items: updatedItems,
      numberOfItems: state.numberOfItems - removedItem.amount,
      totalAmount: state.totalAmount - removedItem.price * removedItem.amount,
    };
  }

  if (action.type === "RESET") {
    return defaultCart;
  }

  return defaultCart;
}

export function CartProvider(props) {
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCart);

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        numberOfItems: cart.numberOfItems,
        totalAmount: cart.totalAmount,
        updateItemAmount: (item) =>
          dispatchCart({ type: "UPDATE_ITEM_AMOUNT", item: item }),
        removeItem: (id) => dispatchCart({ type: "REMOVE_ITEM", id: id }),
        resetCart: () => {
          dispatchCart({ type: "RESET" });
        },
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
