import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setAll_product(data));
  }, []);

  const addToCart = (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

  const token = localStorage.getItem('auth-token');
  if (token) {
    fetch('http://localhost:4000/addtocart', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }), // ✅ JSON body properly sent
    })
      .then((response) => response.json()) // ✅ then chain outside
      .then((data) => console.log("Add to cart response:", data))
      .catch((err) => console.error("Add to cart error:", err));
  }
};


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo?.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
