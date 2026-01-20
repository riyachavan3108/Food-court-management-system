const express = require("express");
const admin = require("../config/firebase");

const router = express.Router();

// Test Push Notification Route
router.post("/send-notification", async (req, res) => {
    try {
        const { fcmToken, title, body } = req.body;

        if (!fcmToken) {
            return res.status(400).json({ message: "FCM token is required" });
        }

        const message = {
            token: fcmToken,
            notification: { title, body },
        };

        const response = await admin.messaging().send(message);
        res.json({ message: "Notification sent successfully", response });
    } catch (error) {
        res.status(500).json({ message: "Error sending notification", error });
    }
});

module.exports = router;
