const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  income: {
    type: Number,
    default: 0,
  },

  creditScore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Customer", customerSchema);