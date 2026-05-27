const LoanApplication = require("../models/LoanApplication");

const Customer = require("../models/Customer");

// GET DASHBOARD STATS

exports.getDashboardStats =
  async (req, res) => {
    try {
      const pending =
        await LoanApplication.countDocuments(
          {
            status: "PENDING",
          }
        );

      const approved =
        await LoanApplication.countDocuments(
          {
            status: "APPROVED",
          }
        );

      const rejected =
        await LoanApplication.countDocuments(
          {
            status: "REJECTED",
          }
        );

      const recentLoans =
        await LoanApplication.find()
          .populate({
            path: "customerId",
            populate: {
              path: "userId",
              select:
                "name email",
            },
          })
          .sort({
            updatedAt: -1,
          })
          .limit(5);

      res.json({
        pending,
        approved,
        rejected,
        recentLoans,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET PENDING LOANS

exports.getPendingLoans =
  async (req, res) => {
    try {
      const loans =
        await LoanApplication.find({
          status: "PENDING",
        })
          .populate({
            path: "customerId",
            populate: {
              path: "userId",
              select:
                "name email",
            },
          })
          .sort({
            createdAt: -1,
          });

      const formattedLoans =
        loans.map((loan) => {
          const score =
            loan.eligibilityScore;

          let remark =
            "Not Eligible";

          if (score >= 0.7) {
            remark =
              "Highly Eligible";
          } else if (
            score >= 0.5
          ) {
            remark =
              "Moderate Eligible";
          }

          return {
            ...loan.toObject(),
            remark,
          };
        });

      res.json(formattedLoans);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// REVIEW LOAN

exports.reviewLoan = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const loan =
      await LoanApplication.findById(
        req.params.id
      );

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    loan.status = status;

    await loan.save();

    res.json({
      message:
        "Loan reviewed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};