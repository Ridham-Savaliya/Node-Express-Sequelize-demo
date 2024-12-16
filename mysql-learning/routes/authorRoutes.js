const authorController =  require('../contollers/authorController');
const express = require("express");
const router = express.Router();

router.post("/createAuthor", authorController.addAuthor); // Add a new author
router.get("/", authorController.getAuthor); // Get all authors with their books
router.post("/associate", authorController.addauthorBook); // Associate an author with a book
router.delete("/disassociate", authorController.removeauthorBook); // Remove the association
router.delete("/author/:id", authorController.deleteAuthor);// deletes the Respective author



module.exports = router;
