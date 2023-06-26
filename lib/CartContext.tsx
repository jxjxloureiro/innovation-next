import React, { createContext, useEffect, useReducer } from 'react';

export interface CartItem {
  id: number;
  name: string;
}

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: CartItem }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const initialState: CartState = {
  cartItems: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const addToCart = (id: number, name: string) => {
      dispatch({ type: 'ADD_TO_CART', payload: { id, name } });
    };
    const data = localStorage.getItem('cartItems');
    const jsonFromData = JSON.parse(data || "[]");
    if (data !== null) jsonFromData.forEach((element: { id: number; name: string; }) => {
      addToCart(element.id, element.name)
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
  );
};

export { CartContext, CartProvider };
