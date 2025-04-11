const express = require("express");
const Contact = require("../models/Contact");
const Feedback = require("../models/Feedback");
const verifyToken = require("../middleware/authMiddleware"); // assuming JWT middleware

const router = express.Router();

// Post Contact
router.post("/contact", async (req, res) => {
  try {
    //console.log("Incoming Data",req.body); // Debugging
    //console.log("ContactQuery Model:", Contact); // Debugging
    const { email, subject, message } = req.body;
    try {
        const newQuery = new Contact({ email, subject, message });
        await newQuery.save();
    } catch (error) {
        console.error("Error saving query:", error);
    }
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (error) {
    console.error("Error submitting query ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all contact queries (admin use)
router.get("/contacts", async (req, res) => {
  try {
    const queries = await Contact.find()
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;


// Feedback submission route for authenticated users
router.post("/feedback", verifyToken, async (req, res) => {
  const { noOfStars, feedback } = req.body;

  try {
    const newFeedback = new Feedback({
      userId: req.user.id,
      noOfStars,
      feedback,
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
});

// Display latest Feedbacks on Home Page
router.get("/displayfeedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(9)
      .populate("userId", "name"); // populate 'name'

    const transformed = feedbacks.map(fb => ({
      name: fb.userId?.name || "Anonymous",
      rating: fb.noOfStars,
      comment: fb.feedback,
    }));
    
    res.json(transformed);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
