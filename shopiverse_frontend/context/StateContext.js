import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export default function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  let foundProduct, productIndex;

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  const onAdd = (product, quantity) => {
    const productInCart = cartItems.find((item) => item._id === product._id);

    if (productInCart) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity,
      );
      setTotalQuantities((prevTotalQuanties) => prevTotalQuanties + quantity);

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, product]);
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity,
      );
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity,
      );
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity,
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity,
    );
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    productIndex = cartItems.findIndex((item) => item._id === id);

    if (value === 'inc') {
      setCartItems(
        cartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuanties) => prevTotalQuanties + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems(
          cartItems.map((item, i) => {
            if (item._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        toggleCartItemQuantity,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        paymentProcessing,
        setPaymentProcessing,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
