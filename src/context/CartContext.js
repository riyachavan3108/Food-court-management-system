import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [selectedFoodCourtId, setSelectedFoodCourtId] = useState(null);

    // ✅ Function to add item to cart (Already Fixed)
    const addToCart = (item, restaurantId, foodCourtId) => {
        setCart((prevCart) => {
            if (prevCart.length === 0) setSelectedFoodCourtId(foodCourtId);
            if (selectedFoodCourtId && selectedFoodCourtId !== foodCourtId) {
                alert("You can only add items from one food court at a time.");
                return prevCart;
            }

            const itemKey = `${item.id}-${item.name}-${restaurantId}`;
            const existingItem = prevCart.find((cartItem) => cartItem.key === itemKey);

            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.key === itemKey
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1, foodCourtId, restaurantId, key: itemKey }];
            }
        });
    };

    // ✅ Fixed: Function to remove a single item from the cart
    const removeFromCart = (key) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) => 
                    item.key === key 
                        ? { ...item, quantity: item.quantity - 1 } 
                        : item
                )
                .filter((item) => item.quantity > 0); // ✅ Remove if quantity reaches 0

            if (updatedCart.length === 0) setSelectedFoodCourtId(null);
            return updatedCart;
        });
    };

    // ✅ Fixed: Function to clear entire cart
    const clearCart = () => {
        setCart([]); // ✅ Empty the cart
        setSelectedFoodCourtId(null); // ✅ Reset food court selection
    };

    // ✅ Function to calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice, selectedFoodCourtId }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
