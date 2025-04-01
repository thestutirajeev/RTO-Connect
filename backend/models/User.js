const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  dlTestResult: {
    scorePercentage: { type: Number, default: null }, // Store test score
    timestamp: { type: Date }, // Store test date
  },
});

module.exports = mongoose.model("User", userSchema);
