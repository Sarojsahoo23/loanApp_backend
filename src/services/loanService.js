const LoanApplication = require("../models/LoanApplication");

const Customer = require("../models/Customer");

const evaluateLoan = async (
  loanId
) => {
  const loan =
    await LoanApplication.findById(
      loanId
    );

  const customer =
    await Customer.findById(
      loan.customerId
    );

  if (!customer) {
    throw new Error(
      "Customer not found"
    );
  }

  // USE LOAN CREDIT SCORE
  // NOT CUSTOMER CREDIT SCORE

  const creditScoreNorm =
    Math.min(
      loan.creditScore / 900,
      1
    );

  const incomeNorm = Math.min(
    customer.income / 1000000,
    1
  );

  const score =
    0.6 * creditScoreNorm +
    0.4 * incomeNorm;

  loan.eligibilityScore =
    Number(score.toFixed(2));

  // REMARK LOGIC

  if (score >= 0.6) {
    loan.remark =
      "Highly Eligible";
  } else if (score >= 0.5) {
    loan.remark =
      "Moderate Eligible";
  } else {
    loan.remark =
      "Not Eligible";
  }

  loan.status = "PENDING";

  await loan.save();

  return loan;
};

module.exports = {
  evaluateLoan,
};