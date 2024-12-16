const Sequelize = require("sequelize");
const sequelize = require("../utills/database");
const Customer = require('./customer');

const Order = sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    total:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

});

// defining Relationship between the tables
Customer.hasMany(Order);
Order.belongsTo(Customer);

module.exports =  Order;
