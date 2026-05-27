const bcrypt = require("bcryptjs");

const User = require("../models/User");

const Customer = require("../models/Customer");

const LoanOfficer = require("../models/LoanOfficer");

const generateToken = require("../utils/generateToken");

// REGISTER

exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
      income,
      creditScore,
      branch,
    } = req.body;

    // CHECK EXISTING USER

    const existing =
      await User.findOne({
        email,
      });

    if (existing) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    // HASH PASSWORD

    const passwordHash =
      await bcrypt.hash(
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

    res.status(201).json({
      message:
        "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN

exports.login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    // FIND USER

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    // GENERATE TOKEN

    const token =
      generateToken(user);

    res.json({
      token,
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};