const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, World! This is your MongoDB server.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});