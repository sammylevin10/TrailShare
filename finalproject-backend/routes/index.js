const express = require("express");
const router = express.Router();

const sampleJSON = [
  {
    name: "Name",
    role: "Role",
    info: "Info",
  },
  {
    name: "Name2",
    role: "Role2",
    info: "Info",
  },
];

router.get("/", (req, res) => {
  res.send(sampleJSON);
});

module.exports = router;
