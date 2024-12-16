const express = require("express");
const router = express.Router();
const bookController = require("../contollers/bookController");

router.post("/createBook", bookController.addBook); // Add a new book
router.get("/", bookController.getBooks); // Get all books with their authors
router.delete('/book/:id',bookController.DeleteBookById); // deletes books by id



module.exports = router;
