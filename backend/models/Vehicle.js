const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  // Owner Details
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  ownerAddress: { type: String, required: true },
  ownerAadhar: { type: String, required: true },

  // Vehicle Details
  vehicleManufacturer: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleType: { type: String, required: true },
  fuelType: { type: String, required: true },
  engineNumber: { type: String, required: true },
  chassisNumber: { type: String, required: true },

  // Registration Details
  registrationNumber: { type: String, required: true },
  registrationStartDate: { type: Date, required: true },
  registrationEndDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
