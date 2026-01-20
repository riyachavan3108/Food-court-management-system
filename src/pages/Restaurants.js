import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import "../styles/Restaurants.css";

const Restaurants = () => {
    const { id: foodCourtId } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [foodCourtName, setFoodCourtName] = useState("");

    const fetchRestaurants = useCallback(async () => {
        if (!foodCourtId) {
            console.error("❌ No foodCourtId found!");
            setError("Food court ID is missing.");
            setLoading(false);
            return;
        }

        try {
            console.log(`🔄 Fetching restaurants for foodCourtId: ${foodCourtId}`);

            // ✅ Fetch food court details first (to get the name)
            const foodCourtResponse = await fetch(`http://localhost:5001/api/foodCourts/${foodCourtId}`);
            if (!foodCourtResponse.ok) throw new Error("Failed to fetch food court details.");
            const foodCourtData = await foodCourtResponse.json();
            setFoodCourtName(foodCourtData.name);

            // ✅ Fetch restaurants with correct API route
            const response = await fetch(`http://localhost:5001/api/restaurants/${foodCourtId}`);
            if (!response.ok) throw new Error(`❌ Failed to fetch restaurants: ${response.statusText}`);

            const data = await response.json();
            console.log("✅ Fetched restaurants:", data);

            if (!Array.isArray(data)) throw new Error("❌ API response is not an array!");

            setRestaurants(data);

            // ✅ Update Page Title for SEO
            document.title = `${foodCourtData.name} - Restaurants`;
        } catch (err) {
            console.error("❌ Error fetching restaurants:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [foodCourtId]);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    if (loading) return <p>⏳ Loading restaurants...</p>;

    if (error)
        return (
            <div className="error-container">
                <p>⚠️ {error}</p>
                <button onClick={() => fetchRestaurants()}>🔄 Retry</button>
            </div>
        );

    if (!restaurants.length)
        return <p>❌ No restaurants available in {foodCourtName || "this food court"}.</p>;

    return (
        <div className="restaurants-container">
            <h2>🍽 Restaurants in {foodCourtName || "Selected Food Court"}</h2>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Restaurants;
