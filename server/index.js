const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
// const connectdb = require("./config/db.js");

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Apply CORS middleware before defining routes
app.use(cors());

// Middleware for parsing JSON data
app.use(express.json());

// Database connection
// require("./config/db");

// Define Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/voter", require("./routes/uploadVoterDetails"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
