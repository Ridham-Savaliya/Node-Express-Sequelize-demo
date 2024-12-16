const { Sequelize } = require("sequelize");
const sequelize = require("../utills/database");
const AuthorBook = require("../models/AuthorBooks");
const Author = require("../models/author");
const Book = require("../models/book");

exports.UpdateAuthorbook = async (req, res) => {
  try {
    let { bookId, authorId, year, role } = req.body;

    // uses the managed transaction
    await sequelize.transaction(async (t) => {
      let book = await Book.findByPk(bookId, { transaction: t });
      let author = await Author.findByPk(authorId, { transaction: t });

      if (!author || !book) {
        return res
          .status(404)
          .json({
            error: 'author or book isn"t availble to perform alteration!',
          });
      }
      // marks the error here
      let association = await AuthorBook.findOne(
        { where: { authorId, bookId } },
        { transaction: t }
      );

      if (!association) {
        return res.status(404).json({ error: "Association not found" });
      }

      association.Year = year;
      association.role = role;
      await association.save({ transaction: t });

      res
        .status(200)
        .json({ message: "Association Altered Succssfully!", association });
    });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "failed to upadate the auhtorbook!",
        details: error.message,
      });
  }
};
