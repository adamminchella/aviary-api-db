const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const birdRoutes = require("./routes/birds");
server.use("/birds", birdRoutes);

server.get("/", (req, res) => {
  res.send("Welcome");
});

module.exports = server;
