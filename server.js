const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);

app.use("/", express.static("frontend"));

module.exports = {
  app,
};
