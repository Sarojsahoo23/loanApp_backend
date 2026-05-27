const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  branch: {
    type: String,
    default: "Main Branch",
  },
});

module.exports = mongoose.model("LoanOfficer", officerSchema);