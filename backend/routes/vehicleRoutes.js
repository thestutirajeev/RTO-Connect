const express = require("express");
const Vehicle = require("../models/Vehicle");
const router = express.Router();

// Register a vehicle
router.post("/registerVehicle", async (req, res) => {
  try {
    //console.log("Received Data:", req.body); // Debugging
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save(); // Save new vehicle to database

    res.status(201).json({ message: "Vehicle registered successfully!", newVehicle });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message }); // Handle validation errors
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all registered vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

module.exports = router;
