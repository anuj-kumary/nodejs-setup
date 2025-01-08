// src/index.ts
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;
const createDatabase = require("./config/dbConnection");

const startServer = async () => {
    await createDatabase();
    const userRoutes = require("./routes/userRoutes");
    app.use('/api', userRoutes);
}

app.get("/", (req, res) => {
    res.send("Hello, World! This is your TypeScript server.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


startServer().catch((error) => {
    console.error("Failed to start server:", error);
});