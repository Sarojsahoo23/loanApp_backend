const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User");
const Customer = require("../models/Customer");
const LoanOfficer = require("../models/LoanOfficer");

const generateToken = require("../utils/generateToken");

// ======================================
// REGISTER
// ======================================

exports.register = async (req, res) => {
  try {
    console.log(
      "Mongo Ready State:",
      mongoose.connection.readyState
    );

    const {
      name,
      email,
      password,
      role,
      income,
      creditScore,
      branch,
    } = req.body;

    // VALIDATION

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CHECK EXISTING USER

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // HASH PASSWORD

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    // CREATE USER

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
    });

    // CUSTOMER PROFILE

    if (role === "CUSTOMER") {
      await Customer.create({
        userId: user._id,
        income,
        creditScore,
      });
    }

    // OFFICER PROFILE

    if (role === "OFFICER") {
      await LoanOfficer.create({
        userId: user._id,
        branch,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: user._id,
    });

  } catch (error) {

    console.error(
      "Register Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// LOGIN
// ======================================

exports.login = async (req, res) => {
  try {

    console.log(
      "Mongo Ready State:",
      mongoose.connection.readyState
    );

    const { email, password } = req.body;

    // VALIDATION

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // FIND USER

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // GENERATE TOKEN

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
