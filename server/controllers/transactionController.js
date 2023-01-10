const {
  User,
  Transaction,
  Category
} = require("../models");

class Controller {
  static async getAllTransactions(req, res, next) {
    try {
      // Get the user id from the request object (added by the authentication middleware)
      const { id: UserId } = req.user;

      // Find all transactions in the database, that belongs to the user
      const getAllTransactions = await Transaction.findAll({
        include: [Category],
        attributes: ["id", "name", "amount", "type", "WalletId", "transactionDateTime"],
        where: {
          UserId
        }
      });
      // TODO: cek dengan api docs, bagaimana cara menghandle jika tidak ada data

      // Respond with 200 and the transactions data
      res.status(200).json(getAllTransactions);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionsById(req, res, next) {
    try {
      // Get the required params, and the user id from the request object (added by the authentication middleware)
      const id = req.params.id;
      const { id: UserId } = req.user;

      // Find the transaction with the given id, in the database, and must belong to the user
      const transaction = await Transaction.findByPk(id, {
        include: [Category],
        attributes: ["id", "name", "amount", "type", "WalletId"],
        where: {
          UserId
        }
      });

      // If the transaction is not found, then respond with 404 and error message
      if (!transaction) {
        res.status(404).json({
          message: "Transaction not found"
        });
        return;
      }

      // But if it is found, then respond with 200 and the transaction data
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  static async createTransactions(req, res, next) {
    try {
      // Get the transaction data from the request body, and the user id from the request object (added by the authentication middleware)
      const {
        name,
        amount,
        type,
        CategoryId,
        WalletId,
        transactionDateTime
      } = req.body;
      const { id: UserId } = req.user

      // Create a new transaction with the data
      const newTransaction = await Transaction.create({
        name: name,
        amount: amount,
        type: type,
        transactionDateTime: transactionDateTime,
        UserId,
        CategoryId: CategoryId,
        WalletId: WalletId
      }); //TODO: HANDLE ERROR MESSAGE MISSING WALLET DAN MISSING CATEGORY

      // Return the newly created transaction
      res.status(201).json(newTransaction);
      //TODO: SESUAIKAN API DOC
    } catch (error) {
      next(error);
    }
  }
  static async updateTransaction(req, res, next) {
    try {
      // Get the ID of the transaction to update from the request parameters
      const id = req.params.id;

      // Find the transaction by its ID
      const transaction = await Transaction.findByPk(id)

      // If the transaction was not found, return a 404 error
      if (!transaction) {
        res.status(404).json({
          message: 'Transaction not found'
        });
        return;
      }

      // Get the updates from the request body
      const {
        name,
        amount,
        type,
        CategoryId,
        WalletId
      } = req.body;

      // Update the transaction with the new data
      transaction.name = name || transaction.name;
      transaction.amount = amount || transaction.amount;
      transaction.type = type || transaction.type;
      transaction.CategoryId = CategoryId || transaction.CategoryId;
      transaction.WalletId = WalletId || transaction.WalletId;

      // Save the updates to the database
      await transaction.save();

      // Return the updated transaction
      res.status(200).json(transaction);
      //TODO: SESUAIKAN API DOC
    } catch (error) {
      next(error);
    }
  }
  static async deleteTransaction(req, res, next) {
    try {
      // Get the ID of the transaction to delete from the request parameters
      const id = req.params.id;

      // Find the transaction by its ID
      const transaction = await Transaction.findByPk(id)

      // If the transaction was not found, return a 404 error
      if (!transaction) {
        res.status(404).json({
          message: 'Transaction not found'
        });
        return;
      }

      // Remove the transaction from the database
      await transaction.destroy();
      //TODO: ganti jd soft delete pake status

      // Return a status of 204 (No Content) to indicate that the operation was successful
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }


}
module.exports = Controller;