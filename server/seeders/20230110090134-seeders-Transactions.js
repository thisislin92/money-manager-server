'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataTransactions = require("../data/transaction.json");
    dataTransactions.forEach((transaction) => {
      transaction.createdAt = new Date();
      transaction.updatedAt = new Date();
    }),
      await queryInterface.bulkInsert("Transactions", dataTransactions, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Transactions', null, {});

  }
};
