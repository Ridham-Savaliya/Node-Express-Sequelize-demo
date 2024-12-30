const Sequelize = require("sequelize");
const sequelize = require("../utills/database");
const DataTypes = require('sequelize');

const Customer = sequelize.define("customer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Author', 'Customer'),
    defaultValue: 'Customer', // Default role for new users
  },
});


module.exports = Customer;
