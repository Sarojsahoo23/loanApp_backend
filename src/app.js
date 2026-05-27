const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");
const officerRoutes = require("./routes/officerRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://loan-app-fronted-app.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.use("/loans", loanRoutes);

app.use("/officer", officerRoutes);

module.exports = app;
