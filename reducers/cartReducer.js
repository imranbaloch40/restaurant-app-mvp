export const initialCartState = {
  items: [],
  promo: null,
  orderType: 'Dine-in',
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            qty: 1,
            notes: '',
          },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };

    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.qty > 0),
      };

    case 'UPDATE_NOTE':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, notes: action.payload.notes }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        promo: null,
      };

    case 'APPLY_PROMO':
      return {
        ...state,
        promo: action.payload,
      };

    case 'REMOVE_PROMO':
      return {
        ...state,
        promo: null,
      };
case 'SET_ORDER_TYPE':
  return {
    ...state,
    orderType: action.payload,
  };
    default:
      return state;
  }
}