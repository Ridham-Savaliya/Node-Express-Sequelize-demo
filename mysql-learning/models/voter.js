// models/voter.js
'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');  // Import your Sequelize instance

class Voter extends Model {}

Voter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Voter',  // The model's name
    tableName: 'voters',  // The name of the table in the database
  }
);

module.exports = Voter;
