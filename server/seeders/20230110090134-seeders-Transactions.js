'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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

        // by default transaction.CategoryId =999
        transaction.CategoryId = 999;

        const nameLowerCase = transaction.name.toLowerCase();

        if (nameLowerCase.includes("spbu") || nameLowerCase.includes("shell") || nameLowerCase.includes("flazz")) {
          transaction.CategoryId = 2;
        }

        if (nameLowerCase.includes("herlina") || nameLowerCase.includes("lina")) {
          transaction.CategoryId = 6;
        }

        if (
          nameLowerCase.includes("kartu debit")
        ) {
          transaction.CategoryId = 3;
        }

        if (
          nameLowerCase.includes("uniqlo") ||
          nameLowerCase.includes("zara") ||
          nameLowerCase.includes("h&m")
        ) {
          transaction.CategoryId = 16;
        }

        if (
          nameLowerCase.includes("cimb")
        ) {
          transaction.CategoryId = 15;
        }

        if (
          nameLowerCase.includes("tarik")
        ) {
          transaction.CategoryId = 11;
        }

        if (
          nameLowerCase.includes("biaya")
        ) {
          transaction.CategoryId = 11;
        }

        if (
          nameLowerCase.includes("andang") ||
          nameLowerCase.includes("zinedine") ||
          nameLowerCase.includes("herni")
        ) {
          transaction.CategoryId = 13;
        }

        if (
          nameLowerCase.includes("oneklik") ||
          nameLowerCase.includes("go-pay") ||
          nameLowerCase.includes("gopay") ||
          nameLowerCase.includes("ovo")
        ) {
          transaction.CategoryId = 12;
        }

        if (
          nameLowerCase.includes("cgv") ||
          nameLowerCase.includes("xxi")
        ) {
          transaction.CategoryId = 10;
        }

        if (
          nameLowerCase.includes("familymart") ||
          nameLowerCase.includes("indomaret") ||
          nameLowerCase.includes("alfamart")
        ) {
          transaction.CategoryId = 9;
        }

        if (
          nameLowerCase.includes("sbux") ||
          nameLowerCase.includes("starbucks") ||
          nameLowerCase.includes("coffee")
        ) {
          transaction.CategoryId = 7;
        }

        if (nameLowerCase.includes("titipku")) {
          transaction.CategoryId = 1;
        }

        if (nameLowerCase.includes("bakmi")) {
          transaction.CategoryId = 8;
        }

        if (
          nameLowerCase.includes("tokopedia") ||
          nameLowerCase.includes("card") ||
          nameLowerCase.includes("kredivo") ||
          nameLowerCase.includes("indodana")
        ) {
          transaction.CategoryId = 3;
        }

        if (nameLowerCase.includes("global media") || nameLowerCase.includes("salar")) {
          transaction.CategoryId = 5;
        }

        transaction.createdAt = new Date();
        transaction.updatedAt = new Date();
      }),
      // filter the null data
      await queryInterface.bulkInsert("Transactions", dataTransactions, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Transactions', null, {});

  }
};