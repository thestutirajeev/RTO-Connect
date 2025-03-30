const mongoose = require("mongoose");

const DLTestResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  scorePercentage: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Export the model
const DLTestResult = mongoose.model("DLTestResult", DLTestResultSchema);
module.exports = DLTestResult;
