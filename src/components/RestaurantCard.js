import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="card">
            <h3>{restaurant.name}</h3>
            <p>📍 Location: {restaurant.location}</p>
            <p>🍽 Menu: {restaurant.menu.map((item) => item.name).join(", ")}</p>
            <Link to={`/restaurant/${restaurant._id}`}>
                <button className="btn">View Menu</button>
            </Link>
        </div>
    );
};

export default RestaurantCard;
