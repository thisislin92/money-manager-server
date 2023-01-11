const { Wallet } = require("../models");

class Controller {
    static async getAllWallets(req, res, next) {
        try {
          const { id: UserId } = req.user;
    
          const getAllWallets = await Wallet.findAll({
            where: {
              UserId,
    
            },
            attributes:["id","name"]
          });
    
          res.status(200).json(getAllWallets);
        } catch (error) {
          next(error);
        }
      }

      static async createWallets (req, res, next) {
        try {
          const { id: UserId} = req.user
          // Get the transaction data from the request body
          const { name } = req.body;
      
          // Create a new transaction with the data
          const newWallet = await Wallet.create({
            name,
            UserId
  
          });
      
          // Return the newly created transaction
          res.status(201).json(newWallet);
        } catch (error) {
          next(error);
        }
      }
    
  static async getWalletById(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const {id}=req.params

      const getWalletById = await Wallet.findAll({
        where: {
          UserId,
          id

        },
        attributes:["id","name"]
      });

      res.status(200).json(getWalletById);
    } catch (error) {
      next(error);
    }
  }

  static async updateWallet(req, res, next) {
    try {
      // Get the ID of the transaction to update from the request parameters
      const id = req.params.id;

      // Find the transaction by its ID
      const wallet = await Wallet.findByPk(id).catch((err) => {
        throw err;
      });

      // If the transaction was not found, return a 404 error
      if (!Wallet) {
        res.status(404).json({ message: "Wallet not found" });
        return;
      }

      // Get the updates from the request body
      const { name} = req.body;
      //TODO: buat sesuai api, di cek lg ya di postman
      //TODO: pastikan hanya bisa edit miliknya sendiri

      // Update the transaction with the new data
      wallet.name = name || wallet.name;
      

   

      // Return the updated transaction
      res.status(200).json(wallet);
    } catch (error) {
      next(error);
    }
  }
  static async deleteWallet(req, res, next) {
    try {
      // Get the ID of the transaction to delete from the request parameters
      const id = req.params.id;

      // Find the transaction by its ID
      const wallet = await Wallet.findByPk(id).catch((err) => {
        throw err;
      });

      // If the transaction was not found, return a 404 error
      if (!wallet) {
        res.status(404).json({ message: "Wallet not found" });
        return;
      }

      // Remove the transaction from the database
      await wallet.destroy();

      // Return a status of 204 (No Content) to indicate that the operation was successful
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
