const Author = require("../models/author");
const Book = require("../models/book");

// creates a author in database
exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const author = await Author.create({ name });
    res.status(201).json({ messege: "author created successfully!", author });
  } catch (error) {
    res
      .status(500)
      .json({ error: "error adding author", details: error.message });
  }
};

// get all authors with their books

exports.getAuthor = async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: { model: Book, as: "books" },
    });

    res.status(200).json(authors);
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to get the author", details: error.message });
  }
};

// Associate an author with a book

exports.addauthorBook = async (req, res) => {
  try {
    let { authorId, bookId, role, year } = req.body;
    const author = await Author.findByPk(authorId);
    const book = await Book.findByPk(bookId);

    if (!author || !book) {
     return res.status(404).json({ error: "Author or Book not found" });
    }

    await author.addBook(book, { through: { role: role, Year: year } });
        res.status(201).json({ message: "Author associated with Book" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "failed to assocaiate book with the author!",
        details: error.message,
      });
  }
};

// Remove an association

exports.removeauthorBook = async (req,res) =>{
    try
    {

        let {bookId,authorId} = req.body;
        const author = await Author.findByPk(authorId);
        const book = await Book.findByPk(bookId);

        if (!author || !book) {
            return res.status(404).json({ error: "Author or Book not found" });

          }

         await author.removeBook(book);
         res.status(200).json({ message: "Association removed" });
          

    }
    catch(error)
    {
        res.status(500).json({error:"failed to associated author with the book!"})
    }
}


// for deleteing the author
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    await author.destroy();
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting author", details: error.message });
  }
};
