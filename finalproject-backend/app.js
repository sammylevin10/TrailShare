// Backend application for Final Project
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const indexRoute = require("./routes/index.js");

//HERES WHERE YOU ADD FIREBASE LIKE EX4

// ADD MORE ROUTES FOR GET/SUBMIT LIKE EX4
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", indexRoute);
app.listen(port, () => console.log(`Backend is running at port:${port}`));
