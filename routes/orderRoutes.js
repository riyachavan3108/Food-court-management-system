const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware"); 

// ✅ Place a new order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const newOrder = new Order({
            userId: req.user.id, // Retrieved from JWT middleware
            items,
            totalAmount
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get user's orders
router.get("/", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate("items.restaurantId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
