const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");
const officerRoutes = require("./routes/officerRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.use("/loans", loanRoutes);

app.use("/officer", officerRoutes);

module.exports = app;