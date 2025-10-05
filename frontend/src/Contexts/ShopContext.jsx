import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) cart[index] = 0;
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAll_product(data));
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Add to cart response:", data))
        .catch((err) => console.error(err));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let product = all_product.find((p) => p.id === Number(item));
        total += product?.new_price * cartItems[item];
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) total += cartItems[item];
    }
    return total;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
