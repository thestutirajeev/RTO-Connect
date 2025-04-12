const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Feedback = require("../models/Feedback");

router.get("/", async (req, res) => {
  try {
    const [ users, vehicles, feedbacks] = await Promise.all([
      User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
      ]),
      Vehicle.find(),
      Feedback.aggregate([
        { $group: { _id: "$noOfStars", count: { $sum: 1 } } },
      ]),
    ]);

    const today = new Date();
    const vehicleStats = {
      active: vehicles.filter(v => new Date(v.registrationEndDate) >= today).length,
      expired: vehicles.filter(v => new Date(v.registrationEndDate) < today).length
    };

    res.json({
      users: users.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {}),
      vehicles: vehicleStats,
      feedbacks: feedbacks.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {})
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// backend/routes/stats.js
router.get("/application-trends", async (req, res) => {
    try {
      const pipeline = [
        {
          $match: {
            applicationDate: {
              $gte: new Date(new Date().getFullYear(), 0, 1), // from Jan 1st this year
            },
          },
        },
        {
          $project: {
            month: { $month: "$applicationDate" },
            status: 1,
          },
        },
        {
          $group: {
            _id: { month: "$month", status: "$status" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.month": 1 },
        },
      ];
  
      const data = await Application.aggregate(pipeline);
  
      const monthlyData = Array(12).fill(null).map((_, i) => ({
        month: i + 1,
        Pending: 0,
        Approved: 0,
        Rejected: 0,
      }));
  
      data.forEach((item) => {
        const { month, status } = item._id;
        monthlyData[month - 1][status] = item.count;
      });
      res.json(monthlyData);
    } catch (err) {
      console.error("Trend route error:", err);
      res.status(500).send("Server Error");
    }
  });
  
module.exports = router;
