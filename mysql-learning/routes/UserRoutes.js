const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {body,validationResult} = require('express-validator')
const {User,ValidateModel} = require("../models/user");
const router = express.Router();



// Register User
router.post("/register", async (req, res) => {
  try {
    const error = ValidateModel(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for registration credentials!",
        details: error.details.map((err) => err.message),
      });
    }

    const { email, password, role = "Customer" } = req.body;

    const isExistsUser = await User.findOne({ where: { email } });
    if (isExistsUser) {
      return res.status(409).json({ message: "This email is already taken!" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPwd, role });
    return res.status(201).json({
      message: "User registered successfully!",
      user: { id: user.userId, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", details: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const error = ValidateModel(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for login credentials!",
        details: error.details.map((err) => err.message),
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.userId },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      accessToken,
      refreshToken,
      message: "Login successful!",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login!", details: error.message });
  }
});

module.exports = router;
