// src/index.ts
import express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const createDatabase = require("./config/dbConnection");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
    await createDatabase();
    const db = require("./models");
    const userRoutes = require("./routes/userRoutes");
    app.use('/api', userRoutes);

    if (process.env.NODE_ENV === "development") {
        db.sequelize.sync({ force: true, alter: true }).then(() => {
          console.log("Drop and Resync Database with { force: true }");
        });
      } else {
        db.sequelize.sync({ force: false, alter: true }).then(() => {
          console.log("Resync Database with { force: false }");
        });
      }
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