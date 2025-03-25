const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");

// Get all applications with user details
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId", "name email role") // Populating user details
      .select("applicationDate testDate status aadharNumber dob bloodGroup"); // Selecting only necessary fields

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

// Approve or Reject application
router.put("/applications/:id", async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "Approved"].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Allowed values: Pending, Approved" });
  }

  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "name email role"); // Populate user details

    if (!application) return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: `Application status updated to ${status}`, application });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

module.exports = router;
