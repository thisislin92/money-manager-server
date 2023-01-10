"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      type: {
        type: Sequelize.STRING,
      },
      transactionDateTime: {
        type: Sequelize.DATE,
      },
      UserId:{
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
      }
    },

      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "Cascade",
        onDelete: "Cascade",
      },
      WalletId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Wallets",
          key: "id",
        },
        onUpdate: "Cascade",
        onDelete: "Cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
