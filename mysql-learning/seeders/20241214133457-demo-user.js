'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    
     await queryInterface.bulkInsert('voters', [{
      name: 'Alice Johnson',
      email: 'alice@example.com',
      dob: new Date('1990-06-15'),  // Example Date of Birth
      age:21,
     },
     {
      name: 'Jhon Doe',
      email: 'Jhon@example.com',
      dob: new Date('1992-09-19'),  // Example Date of Birth
      age:21,
     }
    
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
  
   await queryInterface.bulkDelete('voters', null, {});
    
  }
};
