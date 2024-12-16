const Sequelize = require("sequelize");
const sequelize = require("../utills/database");

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
    }

})

module.exports = Author

