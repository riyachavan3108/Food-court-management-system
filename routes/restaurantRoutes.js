const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const FoodCourt = require("../models/FoodCourt");

const router = express.Router();

// ✅ Add a Restaurant
router.post("/public-add", async (req, res) => {
    try {
        const { name, location, menu, foodCourtId } = req.body;

        if (!name || !location || !menu || !foodCourtId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const foodCourt = await FoodCourt.findById(foodCourtId);
        if (!foodCourt) {
            return res.status(404).json({ message: "Food Court not found." });
        }

        const restaurant = new Restaurant({ name, location, menu, foodCourtId });
        await restaurant.save();

        foodCourt.restaurants.push(restaurant._id);
        await foodCourt.save();

        res.status(201).json({ message: "Restaurant added successfully!", restaurant });
    } catch (error) {
        console.error("❌ Error adding restaurant:", error);
        res.status(500).json({ message: "Error adding restaurant", error: error.message });
    }
});

// ✅ Get All Restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        console.error("❌ Error fetching restaurants:", error);
        res.status(500).json({ message: "Error fetching restaurants", error: error.message });
    }
});

// ✅ Get Restaurants by Food Court ID
router.get("/:foodCourtId", async (req, res) => {
    try {
        const { foodCourtId } = req.params;

        console.log("🔍 Searching for restaurants with foodCourtId:", foodCourtId);

        if (!mongoose.Types.ObjectId.isValid(foodCourtId)) {
            return res.status(400).json({ message: "Invalid Food Court ID format." });
        }

        const restaurants = await Restaurant.find({ foodCourtId });

        console.log("📌 Found Restaurants:", restaurants);

        // ✅ Return an empty array instead of 404 when no restaurants exist
        res.json(restaurants.length ? restaurants : []);
    } catch (error) {
        console.error("❌ Error fetching restaurants:", error);
        res.status(500).json({ message: "Error fetching restaurants", error: error.message });
    }
});

// ✅ Get a Single Restaurant by ID
router.get("/restaurant/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;

        console.log("🔍 Searching for restaurant with ID:", restaurantId);

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "Invalid Restaurant ID format." });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }

        res.json(restaurant);
    } catch (error) {
        console.error("❌ Error fetching restaurant:", error);
        res.status(500).json({ message: "Error fetching restaurant", error: error.message });
    }
});

// ✅ Update a Restaurant by ID
router.put("/restaurant/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { name, location, menu } = req.body;

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "Invalid Restaurant ID format." });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { name, location, menu },
            { new: true, runValidators: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }

        res.json({ message: "Restaurant updated successfully!", updatedRestaurant });
    } catch (error) {
        console.error("❌ Error updating restaurant:", error);
        res.status(500).json({ message: "Error updating restaurant", error: error.message });
    }
});

// ✅ Delete a Restaurant by ID
router.delete("/restaurant/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "Invalid Restaurant ID format." });
        }

        const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }

        res.json({ message: "Restaurant deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting restaurant:", error);
        res.status(500).json({ message: "Error deleting restaurant", error: error.message });
    }
});

module.exports = router;
