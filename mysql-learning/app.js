const express = require("express");
require('dotenv').config();
const sequelize = require("./utills/database"); // Database configuration
const customerRoutes = require("./routes/customerRoute"); // Customer routes
const orderRoutes = require("./routes/orderRoute"); // Order routes
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const AuthorbookRoutes =  require('./routes/AssociationsRoute');
const Book  = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user")
const AuthorBooks = require("./models/AuthorBooks");

const app = express();
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/customers", customerRoutes); // Routes for customer operations
app.use("/orders", orderRoutes); // Routes for order operations
app.use("/authors", authorRoutes); // Routes for author operations
app.use("/books", bookRoutes); // Routes for author operations
app.use('/authorbook',AuthorbookRoutes);//Routes foe Authorbook operations

// Sync database and start the server
sequelize
  .sync({}) // Syncs models to the database
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

  app.get("/",function(req,res)
{
  res.send("Welcome to the Sequelize + Node Js Application BY Ridham Savaliya!")
})

module.exports = app;
