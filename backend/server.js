const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.get("/", (req, res) => {
    res.send("RTO Automation Backend is Running...");
});

// Connect to MongoDB
mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  
// Routes
const vehicleRoutes = require("./routes/vehicleRoutes");
app.use("/api/vehicles", vehicleRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

//const adminRoutes = require("./routes/admin");
//app.use("/api/admin", adminRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
