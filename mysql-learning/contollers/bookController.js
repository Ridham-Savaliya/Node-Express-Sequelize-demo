const Author = require("../models/author");
const Book = require("../models/book");

// Add a book

exports.addBook = async (req, res) => {
  try {
    let { price, title } = req.body;
    const book = await Book.create({ price, title });
    res.status(201).json({ message: "Book added", book });
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to add a book!", details: error.message });
  }
};


// get all books with their authors
exports.getBooks = async (req,res) =>{
    try
    {

    const books = await Book.findAll({
        include:{model:Author,as:'authors'}// Include associated authors
    })
    res.status(200).json({ books });

    }
    catch(error)
    {
        res.status(500).json({error:"Error fetching books",details:error.message});
    }
}


// deletes the following book as per given bookId


exports.DeleteBookById =  async (req,res) => {

  try
  {


    let {id} = req.params;


    let book = await Book.findByPk(id);

    if(!book) return res.status(404).json({error:'book not found book associated to this id'});

    let deletedBook = await book.destroy();
    res.status(200).json({deletedBook:'successfully deleted book'});

  }
  catch(error){

    res.status(500).json({error:'failed to delete the book!',details:error.message});

  }

}
