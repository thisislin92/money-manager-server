'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Category, {foreignKey:"CategoryId"})
      Transaction.belongsTo(models.Wallet, {foreignKey:"WalletId"})
      Transaction.belongsTo(models.User, {foreignKey:"UserId"})
    }
  }
  Transaction.init({
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    type: DataTypes.STRING,
    transactionDateTime: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    WalletId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};