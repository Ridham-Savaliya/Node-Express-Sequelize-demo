const { Sequelize } = require("sequelize");

// Create a new instance of Sequelize for MySQL
const sequelize = new Sequelize("ridham", "root", "ridham9499.", {
  host: "localhost", // MySQL server
  dialect: "mysql",
});

// if(sequelize.authenticate())
// {
//     console.log('sucess');

// }

// else
// {
//     console.log('denied!');

// }

module.exports = sequelize;
