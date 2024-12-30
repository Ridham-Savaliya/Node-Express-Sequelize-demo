    const express = require("express");
    const router = express.Router();
    const bookController = require("../contollers/bookController");
    // const authenticate = require("../middlewares/authenticationMiddleware.js");
    const authorizeRoles = require("../middlewares/authorizationMiddleware.js");
    const passport  = require('../config/passport-config.js');

    
    router.post("/createBook", bookController.addBook); // Add a new book
    router.get("/", bookController.getBooks); // Get all books with their authors
    router.delete('/book/:id',bookController.DeleteBookById); // deletes books by id



    module.exports = router;
