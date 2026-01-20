const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    menu: [{ name: String, price: Number }], // ✅ Structured Menu
    foodCourtId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodCourt", required: true }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
