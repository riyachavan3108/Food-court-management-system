import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/RestaurantDetails.css";

const RestaurantDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/restaurants/restaurant/${id}`);
                if (!response.ok) throw new Error("Restaurant not found");
                const data = await response.json();
                setRestaurant(data);
            } catch (error) {
                console.error("Error fetching restaurant:", error); // ✅ Log for debugging
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) return <h2 className="loading">Loading restaurant details...</h2>;
    if (error) return <h2 className="error">Error: {error}</h2>;
    if (!restaurant) return <h2 className="error">Restaurant not found</h2>;

    return (
        <div className="restaurant-container">
            <div className="restaurant-info">
                <h1 className="restaurant-name">{restaurant.name}</h1>
                <p className="restaurant-location">{restaurant.location}</p>
            </div>

            <h2 className="menu-title">Our Special Menu 🍽️</h2>
            {restaurant.menu && restaurant.menu.length > 0 ? (
                <div className="menu-grid">
                    {restaurant.menu.map((item) => (
                        <div className="menu-card" key={item.id}> {/* ✅ Use item.id as key */}
                            <h3>{item.name}</h3>
                            <p className="menu-price">₹{item.price}</p>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart(item, restaurant.id, restaurant.foodCourtId )} // ✅ Handle missing foodCourtId
                            >
                                Add to Cart 🛒
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-menu">No menu items available.</p>
            )}
        </div>
    );
};

export default RestaurantDetails;
