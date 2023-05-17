"use client"

import { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addToCart = (product) => {
    setCartProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}