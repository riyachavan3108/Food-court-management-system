import React from "react";
import { useCart } from "../context/CartContext";

const Menu = ({ restaurant }) => {
    const { addToCart } = useCart();

    return (
        <div>
            <h2>{restaurant.name} Menu</h2>
            <div className="menu-items">
                {restaurant.menu.map((item) => (
                    <div key={item.id} className="menu-item">
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                        <button onClick={() => addToCart(item)}>Add to Cart 🛒</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
