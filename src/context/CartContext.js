import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { promoCodes } from '../data/mockData';
import { cartReducer, initialCartState } from '../../reducers/cartReducer';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const {
    items,
    promo,
    orderType,
  } = state;

  function addToCart(menuItem) {
    dispatch({
      type: 'ADD_ITEM',
      payload: menuItem,
    });
  }

  function updateQty(id, delta) {
    dispatch({
      type: delta > 0 ? 'INCREMENT' : 'DECREMENT',
      payload: id,
    });
  }

  function updateNotes(id, notes) {
    dispatch({
      type: 'UPDATE_NOTE',
      payload: { id, notes },
    });
  }

  function removeItem(id) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  }

  function applyPromo(code) {
    const key = code.trim().toUpperCase();

    if (promoCodes[key]) {
      dispatch({
        type: 'APPLY_PROMO',
        payload: {
          code: key,
          discount: promoCodes[key],
        },
      });

      return true;
    }

    dispatch({ type: 'REMOVE_PROMO' });
    return false;
  }

  function removePromo() {
    dispatch({ type: 'REMOVE_PROMO' });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  function setOrderType(type) {
    dispatch({
      type: 'SET_ORDER_TYPE',
      payload: type,
    });
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const discount = promo ? subtotal * promo.discount : 0;

  const tax = (subtotal - discount) * 0.08;

  const total = subtotal - discount + tax;

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const value = {
    items,
    promo,
    orderType,

    addToCart,
    updateQty,
    updateNotes,
    removeItem,

    applyPromo,
    removePromo,
    clearCart,

    setOrderType,

    subtotal,
    discount,
    tax,
    total,
    itemCount,

    dispatch,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}