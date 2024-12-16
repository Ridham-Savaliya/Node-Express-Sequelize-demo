const Sequelize = require("sequelize");
const sequelize = require("../utills/database");

const AuthorBooks = sequelize.define("AuthorBooks", {
  authorId: {
    type: Sequelize.INTEGER,
    references: {
      model: "authors", // The table the foreign key refers to
      key: "id",
    },
    primaryKey: true, // Part of the composite primary key
  },
  bookId: {
    type: Sequelize.INTEGER,
    references: {
      model: "books", // The table the foreign key refers to
      key: "id",
    },
    primaryKey: true, // Part of the composite primary key
  },
  role: {
    type: Sequelize.STRING,
    allowNull: true, // Optional field to hold the role of the author for the book
  },
  Year:
  {
    type:Sequelize.INTEGER,
    allowNull:true
  },
 });

module.exports = AuthorBooks;
