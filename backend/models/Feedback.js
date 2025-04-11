const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  noOfStars: { type: Number, required: true },
  feedback: { type: String, required: true },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;