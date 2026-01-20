import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart= () => {
    const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();

    return (
        <div className="cart-container">
            <h2>Your Cart 🛒</h2>

            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map((item) => (
                            <li key={item.key} className="cart-item">
                                <span>{item.name} - ₹{item.price} x {item.quantity}</span>
                                
                                {/* ✅ Remove one item button */}
                                <button 
                                    className="remove-btn" 
                                    onClick={() => removeFromCart(item.key)}
                                >
                                    ❌ Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h3>Total: ₹{getTotalPrice()}</h3>

                    {/* ✅ Clear all items button */}
                    <button className="clear-cart-btn" onClick={clearCart}>
                        🗑️ Clear Cart
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
