const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/fetchusers", async (req, res) => {
    const role = req.header("role"); // Get role from request header
  
    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
  
    try {
      const users = await User.find({}, "name email role");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});  

router.delete("/delete/:id", async (req, res) => {
    const role = req.header("role"); // Get role from request header
    if (role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
