import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FoodCourts.css";

const FoodCourts = () => {
  const [foodCourts, setFoodCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodCourts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/foodcourts");
        if (!response.ok) throw new Error("Failed to fetch food courts");
        const data = await response.json();
        setFoodCourts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodCourts();
  }, []);

  if (loading) return <h2 className="loading">Loading food courts...</h2>;
  if (error) return <h2 className="error">Error: {error}</h2>;

  return (
    <div className="foodcourts-container">
      <h1 className="foodcourt-title">🍔 Food Courts in Your City</h1>
      <div className="foodcourt-grid">
        {foodCourts.map((foodCourt) => (
          <Link key={foodCourt.id} to={`/foodcourts/${foodCourt.id}/restaurants`} className="foodcourt-card">
            <div className="foodcourt-img">
              <img src={foodCourt.image || "client/public/images/fc1.avif"} alt={foodCourt.name} />
            </div>
            <div className="foodcourt-info">
              <h2>{foodCourt.name}</h2>
              <p>{foodCourt.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodCourts;
