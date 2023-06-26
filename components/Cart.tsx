import { CartContext, CartItem } from '@/lib/CartContext';
import React, { useContext, useEffect } from 'react';

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(CartContext);

  const removeFromCart = (item: CartItem) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Carrinho</h2>
      {state.cartItems.length === 0 ? (
        <p className="text-gray-500">Adicione itens ao carrinho para visualizá-los aqui</p>
      ) : (
        <ul className="space-y-2">
          {state.cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <p>{item.name}</p>
              <button
                className="text-sm text-red-500"
                onClick={() => removeFromCart(item)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded ml-2"
          onClick={clearCart}
        >
          Limpar carrinho
        </button>
      </div>
    </div>
  );
};

export default Cart;
