const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem"); // Ensure this exists
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Add item to cart
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;

        console.log("🔍 Adding item to cart:", { menuItemId, quantity });

        // ✅ Validate Inputs
        if (!menuItemId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid menu item or quantity." });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            console.log("🛒 No existing cart found, creating a new one.");
            cart = new Cart({ user: req.user.id, items: [{ menuItem: menuItemId, quantity }] });
        } else {
            console.log("📌 Existing cart found. Updating...");
            const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);
            if (itemIndex >= 0) {
                cart.items[itemIndex].quantity += quantity;
                console.log("➕ Quantity updated for existing item.");
            } else {
                cart.items.push({ menuItem: menuItemId, quantity });
                console.log("🆕 New item added to cart.");
            }
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("❌ Error adding item to cart:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ View Cart
router.get("/", authMiddleware, async (req, res) => {
    try {
        console.log("🔍 Fetching cart for user:", req.user.id);

        const cart = await Cart.findOne({ user: req.user.id }).populate("items.menuItem");

        if (!cart) {
            console.log("🛒 Cart is empty.");
            return res.json({ user: req.user.id, items: [] });
        }

        console.log("📌 Cart found:", cart);
        res.json(cart);
    } catch (error) {
        console.error("❌ Error fetching cart:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Remove Item from Cart
router.post("/remove", authMiddleware, async (req, res) => {
    try {
        const { menuItemId } = req.body;
        console.log("🗑️ Removing item from cart:", menuItemId);

        if (!menuItemId) {
            return res.status(400).json({ message: "Invalid menu item ID." });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (cart) {
            const initialCount = cart.items.length;
            cart.items = cart.items.filter(item => item.menuItem.toString() !== menuItemId);

            if (cart.items.length === initialCount) {
                console.log("⚠️ Item not found in cart.");
                return res.status(404).json({ message: "Item not found in cart." });
            }

            await cart.save();
            console.log("✅ Item removed successfully.");
        }

        res.json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.error("❌ Error removing item from cart:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
