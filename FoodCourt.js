const mongoose = require("mongoose");

const foodCourtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: String,
    imageUrl: String,
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }] // ✅ Correct Reference
});

module.exports = mongoose.model("FoodCourt", foodCourtSchema);
