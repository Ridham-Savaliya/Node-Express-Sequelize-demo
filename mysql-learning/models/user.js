const sequelize = require("../utills/database");
const Sequelize = require("sequelize");
const Joi = require('joi');
const DataTypes = require('sequelize');

const User = sequelize.define("user", {
 
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Author', 'Customer'),
    defaultValue: 'Customer', // Default role for new users
    allowNull:false,
  },
});

  const ValidateModel  = (data) => {

    let schema = Joi.object({

      email:Joi.string().email().min(3).required(),
      password:Joi.string().min(3).max(20).required().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-=_]).{6,20}$/) // ,
      // Single regex for all conditions
      ,role: Joi.string().valid("Admin", "Customer", "Author").default("Customer"),

    }).messages({
      'string.email':'Enter the valid Email Address!',
      'string.required':'All the specified values are required!',
      'string.min':'minimum 3 charcters are required for the email and 8 for the password!',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!',
    })

    let {error} =  schema.validate(data);
    return error;

  }

module.exports = {User,ValidateModel};
