const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res) => {
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

module.exports = router;
