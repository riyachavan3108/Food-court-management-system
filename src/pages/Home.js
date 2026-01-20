import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import heroImage from "../pages/hero.avif";
import searchIcon from "../pages/search.png";

const Home = () => {
  const [foodCourts, setFoodCourts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/foodcourts") // ✅ Fixed API endpoint case
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch food courts");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Fetched food courts:", data);
        setFoodCourts(data);
      })
      .catch((err) => {
        console.error("❌ Error fetching food courts:", err);
        setError("Failed to load food courts. Please try again later.");
      });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Discover the Best Food Courts</h1>
          <p>Find your favorite restaurants and enjoy delicious meals.</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </div>
        <img src={heroImage} alt="Delicious food" className="hero-image" />
      </section>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search food courts..." />
        <button><img src={searchIcon} alt="Search" /></button>
      </div>

      {/* Featured Food Courts */}
      <section className="featured">
        <h2>Featured Food Courts</h2>
        <div className="food-court-list">
          {error ? (
            <p className="error-message">⚠️ {error}</p>
          ) : foodCourts.length > 0 ? (
            foodCourts.map((foodCourt) => (
              <div key={foodCourt._id} className="food-court-card">
                <img 
                  src={foodCourt.imageUrl || "/default-foodcourt.jpg"} 
                  alt={foodCourt.name || "Food Court"} 
                  onError={(e) => (e.target.src = "/default-foodcourt.jpg")} // Fallback on error
                />
                <h3>{foodCourt.name || "Unknown Name"}</h3>
                <p>{foodCourt.description || "No description available"}</p>
                <p><strong>📍 Location:</strong> {foodCourt.location || "Unknown"}</p>
                <Link to={`/foodcourts/${foodCourt._id}/restaurants`}>View Restaurants</Link>
              </div>
            ))
          ) : (
            <p>⏳ Loading food courts...</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Food Court Management. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
