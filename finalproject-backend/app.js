// Backend application for Final Project
const express = require("express");

const app = express();
const port = 4000;

// Import the routes
const indexRoute = require("./routes/index.js");

// If someone creates a get request to our root, we send them this string
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/", indexRoute);

app.listen(port, () => console.log("Backend is running!"));
