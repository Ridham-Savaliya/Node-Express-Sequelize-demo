const Sequelize  = require('sequelize')
const sequelize = require("../utills/database");
const  Author = require("./author")
const AuthorBooks = require('../models/AuthorBooks')

const Book = sequelize.define('book',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        autoIncrement:true,
        primaryKey:true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }

});

// Define the many-to-many association
Author.belongsToMany(Book,{through:"AuthorBooks",as:"books"});
Book.belongsToMany(Author,{through:"AuthorBooks",as:"authors"});




module.exports  = Book;
