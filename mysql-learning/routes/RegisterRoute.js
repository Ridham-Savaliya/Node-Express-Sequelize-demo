const express = require("express");
const { body, validationResult } = require("express-validator");
const {User,ValidateModel} = require("../models/user");
const bycrpt = require('bcrypt');
const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email address!"),
    body("password")
      .isLength({ min: 6 }).trim().escape().withMessage("Password must be at least 6 characters long!"),
      
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Save the user to the database
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: "User already exists!" });
      }

     let hashedPwd  = await bycrpt.hash(password,10);
     let newUser = await User.create({ email,password:hashedPwd });
      return res.status(201).json({ message: "User created successfully!" ,newUser});
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create user!", details: error.message });
    }
  }
);

module.exports = router;
