/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'globalCartCount';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  
  // Intenta leer el valor inicial de localStorage, si no existe, usa 0
  const [cartCount, setCartCount] = useState(() => {
    try {
      const storedCount = window.localStorage.getItem(CART_STORAGE_KEY);
      return storedCount ? parseInt(storedCount, 10) : 0;
    } catch (error) {
      console.error("Error al leer del storage:", error);
      return 0;
    }
  });

  // Guarda el valor en localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, cartCount.toString());
    } catch (error) {
      console.error("Error al guardar en el storage:", error);
    }
  }, [cartCount]);

  const contextValue = { cartCount, setCartCount };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useGlobalCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('Contexto no definido.');
  }
  return context;
}