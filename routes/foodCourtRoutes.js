const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const FoodCourt = require("../models/FoodCourt");
const Restaurant = require("../models/Restaurant");

// ✅ Fetch all food courts (With Debugging)
router.get("/", async (req, res) => {
    try {
        console.log("🔍 Fetching all food courts...");

        const foodCourts = await FoodCourt.find().populate("restaurants");

        console.log(`📌 Found ${foodCourts.length} Food Courts`);
        res.json(foodCourts);
    } catch (error) {
        console.error("❌ Error fetching food courts:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// ✅ Fetch a single food court by ID (With Validation)
router.get("/:foodCourtId", async (req, res) => {
    try {
        const { foodCourtId } = req.params;
        console.log("🔍 Fetching Food Court ID:", foodCourtId);

        // ✅ Validate ObjectId
        if (!mongoose.isValidObjectId(foodCourtId)) {
            return res.status(400).json({ message: "❌ Invalid Food Court ID format." });
        }

        const foodCourt = await FoodCourt.findById(foodCourtId).populate("restaurants");

        if (!foodCourt) {
            return res.status(404).json({ message: "❌ Food court not found." });
        }

        res.json(foodCourt);
    } catch (error) {
        console.error("❌ Error fetching food court:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// ✅ Fetch all restaurants of a specific food court (With Validation & Debugging)
router.get("/:foodCourtId/restaurants", async (req, res) => {
    try {
        const { foodCourtId } = req.params;
        console.log("🔍 Fetching restaurants for Food Court ID:", foodCourtId);

        // ✅ Validate ObjectId
        if (!mongoose.isValidObjectId(foodCourtId)) {
            return res.status(400).json({ message: "❌ Invalid Food Court ID format." });
        }

        // ✅ Check if Food Court Exists
        const foodCourt = await FoodCourt.findById(foodCourtId);
        if (!foodCourt) {
            return res.status(404).json({ message: "❌ Food court not found." });
        }

        // ✅ Fetch Restaurants Linked to This Food Court
        const restaurants = await Restaurant.find({ foodCourtId });

        console.log(`📌 Found ${restaurants.length} Restaurants`);

        res.json(restaurants.length ? restaurants : []);
    } catch (error) {
        console.error("❌ Error fetching restaurants:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
