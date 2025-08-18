import { ADD_to_CART, REMOVE_from_CART, SET_PRODUCTS, EMPTY_CART } from "./constant";

// Initial state for cart
const initialCartState = {
  cart: []
};

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_to_CART: {
      const existingItem = state.cart.find(item => item.name === action.payload.name);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.name === action.payload.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case REMOVE_from_CART: {
      const existingItem = state.cart.find(item => item.name === action.payload.name);

      if (!existingItem) return state;

      if (existingItem.quantity === 1) {
        // Remove item completely
        return {
          ...state,
          cart: state.cart.filter(item => item.name !== action.payload.name),
        };
      } else {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.name === action.payload.name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
    }

    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

// Initial state for products
const initialProductState = {
  product: []
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        product: action.payload
      };

    default:
      return state;
  }
};
