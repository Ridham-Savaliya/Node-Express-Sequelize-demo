'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
      await queryInterface.bulkInsert('users', [{
        userId:1,
        email: 'admin@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        userId: 2,
        email: 'user1@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
     // Remove all inserted data
     return queryInterface.bulkDelete('Users', null, {});
  }
};
