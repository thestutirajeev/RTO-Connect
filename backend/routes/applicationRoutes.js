const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");// Middleware for authentication

// Submit Driving License Application
router.post("/apply", authMiddleware, async (req, res) => {
    try {
      const { testDate, aadharNumber, dob, bloodGroup } = req.body;
  
      if (!testDate || !aadharNumber || !dob || !bloodGroup) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Create application linked to logged-in user
      const newApplication = new Application({
        userId: req.user.id, // Extracted from the authentication middleware
        testDate,
        aadharNumber,
        dob,
        bloodGroup,
      });
  
      await newApplication.save();
      res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error submitting application", error });
    }
});
  
module.exports = router;
