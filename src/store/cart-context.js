import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  numberOfItems: 0,
  totalAmount: 0,
  updateItemAmount: (item) => {},
  removeItem: (id) => {},
});

const defaultCart = {
  items: [],
  numberOfItems: 0,
  totalAmount: 0,
};

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
    state.items.splice(index, 1);

    return {
      items: state.items,
      numberOfItems: state.numberOfItems - removedItem.amount,
      totalAmount: state.totalAmount - removedItem.price * removedItem.amount,
    };
  }
  return defaultCart;
}

export function CartProvider(props) {
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCart);

  function updateItemAmount(item) {
    dispatchCart({ type: "UPDATE_ITEM_AMOUNT", item: item });
  }

  function removeItem(id) {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  }

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        numberOfItems: cart.numberOfItems,
        totalAmount: cart.totalAmount,
        updateItemAmount: updateItemAmount,
        removeItem: removeItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
