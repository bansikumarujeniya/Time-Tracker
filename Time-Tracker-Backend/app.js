const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Fix CORS by explicitly allowing frontend URL
app.use(
    cors({
        origin: "https://time-tracker-frontend-hbcp.onrender.com", // Allow frontend
        methods: "GET,POST,PUT,DELETE",
        credentials: true, // Allow cookies if needed
    })
);

// ✅ Alternative: Allow all origins (for testing, not recommended for production)
// app.use(cors());

app.use(express.json()); // To accept data as JSON

// Import Routes
const roleRoutes = require("./src/routes/RoleRoutes");
const userRoutes = require("./src/routes/UserRoutes");
const projectRoutes = require("./src/routes/ProjectRoutes");
const projectTeamRoutes = require("./src/routes/ProjectTeamRoutes");
const statusRoutes = require("./src/routes/StatusRoutes");
const projectModuleRoutes = require("./src/routes/ProjectModuleRoutes");
const taskRoutes = require("./src/routes/TaskRoutes");
const userTaskRoutes = require("./src/routes/UserTaskRoutes");
const timeLogRoutes = require("./src/routes/TimeLogRoutes");
const billingRoutes = require("./src/routes/BillingRoutes");
const reportsRoutes = require("./src/routes/ReportsRoutes");

app.use(roleRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(projectTeamRoutes);
app.use(statusRoutes);
app.use(projectModuleRoutes);
app.use(taskRoutes);
app.use(userTaskRoutes);
app.use(timeLogRoutes);
app.use(billingRoutes);
app.use(reportsRoutes);

// ✅ Fix CORS for all routes by adding middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://time-tracker-frontend-hbcp.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Database Connection
mongoose
    .connect("mongodb+srv://bansikumar1307:<Bansikumar1307>@cluster0.mcrpc.mongodb.net/?")
    .then(() => console.log("Database connected...."))
    .catch((error) => console.error("Database connection failed:", error));

// Server Creation
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server started on port number", PORT);
});
