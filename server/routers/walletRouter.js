const walletRouter = require("express").Router();
const Controller = require("../controllers/walletController");
const { authentication, authorization } = require("../middlewares");

walletRouter.get("/wallets/", authentication,Controller.getAllWallets);
walletRouter.post("/wallets/", authentication,Controller.createWallets);
walletRouter.get("/wallets/:id", authentication,Controller.getWalletById);
walletRouter.patch("/wallets/:id", Controller.updateWallet);
walletRouter.delete("/wallets/:id", Controller.deleteWallet);


module.exports = walletRouter;
