const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getPendingLoans,
  reviewLoan,
  getDashboardStats,
} = require("../controllers/officerController");

router.get(
  "/dashboard",
  auth,
  getDashboardStats
);

router.get(
  "/loans/pending",
  auth,
  getPendingLoans
);

router.post(
  "/loans/:id/review",
  auth,
  reviewLoan
);

module.exports = router;