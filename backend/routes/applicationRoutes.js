const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");// Middleware for authentication
//Index of Routes in this page
// 1. DL Test Result Submission by User
// 2. Submit Driving License Application by User
// 3. Fetch all applications for the logged-in user
// 4. Fetch all applications with user details for Admin
// 5. Approve or Reject application by Admin

//DL Test Result Submission by User
router.post("/savetestresult", authMiddleware, async (req, res) => {
  try {
    const { scorePercentage } = req.body;
    if (scorePercentage === undefined) {
      return res.status(400).json({ message: "Missing scorePercentage" });
    }

    if (scorePercentage < 60) {
      return res.status(200).json({ message: "Test failed. Not stored in DB." });
    }

    // Update the User schema with the latest test result
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        dlTestResult: {
          scorePercentage,
          timestamp: new Date(),
        },
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Test result saved successfully",
      dlTestResult: updatedUser.dlTestResult,
    });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

//For User
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

//For User
// Route: Check if user has given the test in the last 24 hours and if they have a pending application
router.get("/check-test-status", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If no test result exists
    if (!user.dlTestResult || !user.dlTestResult.timestamp) {
      return res.status(403).json({ message: "You need to give the license test first before applying." });
    }

    // Check if the test was given in the last 24 hours
    const lastTestTime = new Date(user.dlTestResult.timestamp);
    const currentTime = new Date();
    const hoursDifference = (currentTime - lastTestTime) / (1000 * 60 * 60); // Convert to hours

    if (hoursDifference > 24) {
      return res.status(403).json({
        message: "Your last test was more than 24 hours ago. Please take the test again before applying."
      });
    }

    // Check if the user already has a "Pending" application
    const existingApplication = await Application.findOne({
      userId: req.user.id,
      status: "Pending",
    });

    if (existingApplication) {
      return res.status(403).json({
        message: "You already have a pending application. Check your status on the Status page."
      });
    }

    return res.status(200).json({ message: "Test was taken within 24 hours. Application is allowed." });

  } catch (error) {
    console.error("Error checking test status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//For User
// Fetch all applications for the logged-in user
router.get("/myapplications/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL params
    const applications = await Application.find({ userId })
      .sort({ applicationDate: -1 }) // Newest first
      .select("applicationDate testDate status aadharNumber bloodGroup");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

//For Admin
// Get all applications with user details
router.get("/fetchapplications", async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ applicationDate: -1 }) // Newest first
      .populate("userId", "name email role") // Populating user details
      .select("applicationDate testDate status aadharNumber dob bloodGroup"); // Selecting only necessary fields

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

//For Admin
// Approve or Reject application
router.put("/updateapplicationstatus/:id", async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Allowed values: Pending, Approved, Rejected" });
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

//For Admin
// Delete application by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Application.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
