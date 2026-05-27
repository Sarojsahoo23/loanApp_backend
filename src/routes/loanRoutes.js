const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  applyLoan,
  getLoanStatus,
  getCustomerLoans,
} = require("../controllers/loanController");

// APPLY LOAN

router.post(
  "/apply",
  auth,
  applyLoan
);

// GET SINGLE LOAN STATUS

router.get(
  "/:id/status",
  auth,
  getLoanStatus
);

// GET CUSTOMER LOANS

router.get(
  "/customer/all",
  auth,
  getCustomerLoans
);

module.exports = router;