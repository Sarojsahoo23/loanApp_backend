const LoanApplication = require("../models/LoanApplication");

const Customer = require("../models/Customer");

const {
  evaluateLoan,
} = require("../services/loanService");

// APPLY LOAN

exports.applyLoan = async (
  req,
  res
) => {
  try {
    const {
      amountRequested,
      tenureMonths,
      creditScore,
    } = req.body;

    const customer =
      await Customer.findOne({
        userId: req.user.userId,
      });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // CREATE LOAN
    // WITH OWN CREDIT SCORE

    const loan =
      await LoanApplication.create({
        customerId: customer._id,
        amountRequested,
        tenureMonths,
        creditScore,
      });

    await evaluateLoan(loan._id);

    res.status(201).json({
      loanId: loan._id,
      message:
        "Loan application submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// GET LOAN STATUS

exports.getLoanStatus =
  async (req, res) => {
    try {
      const loan =
        await LoanApplication.findById(
          req.params.id
        );

      if (!loan) {
        return res.status(404).json({
          message: "Loan not found",
        });
      }

      res.json({
        status: loan.status,
        eligibilityScore:
          loan.eligibilityScore,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET CUSTOMER LOANS

exports.getCustomerLoans =
  async (req, res) => {
    try {
      const customer =
        await Customer.findOne({
          userId: req.user.userId,
        });

      if (!customer) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      const loans =
        await LoanApplication.find({
          customerId: customer._id,
        }).sort({
          createdAt: -1,
        });

      res.json(loans);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };