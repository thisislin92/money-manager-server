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
    const dataWallets = require ('../data/wallet.json')
    dataWallets.forEach((wallet)=>{
      wallet.createdAt = new Date ()
      wallet.updatedAt = new Date ()
    }),
    await queryInterface.bulkInsert('Wallets',dataWallets,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Wallets', null, {});
  }
};
