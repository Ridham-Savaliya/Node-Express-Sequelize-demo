const Sequelize = require("sequelize");
const sequelize = require("../utills/database");
const DataTypes = require('sequelize');

const Author = sequelize.define('author',{

    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Author', 'Customer'),
        defaultValue: 'Author', // Default role for new users
      },
})

module.exports = Author

