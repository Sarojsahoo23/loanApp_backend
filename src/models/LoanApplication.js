const mongoose = require("mongoose");

const LoanApplication =
  new mongoose.Schema(
    {
      customerId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Customer",
        required: true,
      },

      officerId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "LoanOfficer",
      },

      amountRequested: {
        type: Number,
        required: true,
      },

      tenureMonths: {
        type: Number,
        required: true,
      },

      // SAVE CREDIT SCORE
      // PER LOAN

      creditScore: {
        type: Number,
      },

      interestRate: {
        type: Number,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "APPROVED",
          "REJECTED",
        ],
        default: "PENDING",
      },

      eligibilityScore: {
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "LoanApplication",
    LoanApplication
  );