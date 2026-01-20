const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// Send test notification
router.post("/test", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.fcmToken) {
            return res.status(400).json({ message: "FCM Token not found" });
        }

        const message = {
            token: user.fcmToken,
            notification: {
                title: "Test Notification",
                body: "This is a test message from Food Court Management!",
            },
        };

        await admin.messaging().send(message);
        res.json({ message: "Test notification sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send notification", error });
    }
});

module.exports = router;
