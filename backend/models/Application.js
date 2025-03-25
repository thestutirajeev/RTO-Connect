const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Foreign Key
  applicationDate: { type: Date, default: Date.now }, // Auto-set application date
  testDate: { type: Date, required: true }, // User selects test date
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Default status
  aadharNumber: { type: String, required: true, unique: true }, // Aadhar Number
  dob: { type: Date, required: true }, // Date of Birth
  bloodGroup: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] } // Blood Group
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
