const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant"); // Update path

mongoose.connect("mongodb://localhost:27017/foodcourt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to DB"));

const addRestaurants = async () => {
    const restaurants = [
        { name: "McDonald's", location: "Mall A", menu: ["Burger", "Fries"] },
        { name: "Domino's", location: "Mall B", menu: ["Pizza", "Pasta"] }
    ];

    await Restaurant.insertMany(restaurants);
    console.log("Restaurants added!");
    mongoose.disconnect();
};

addRestaurants();
