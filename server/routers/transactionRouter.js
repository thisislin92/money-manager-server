const transactionRouter = require("express").Router();
const Controller = require("../controllers/transactionController");
const { authentication, authorization } = require("../middlewares");

transactionRouter.get(
  "/transactions",
  authentication,
  Controller.getAllTransactions
);
transactionRouter.post("/transactions", authentication,Controller.createTransactions);
transactionRouter.get("/transactions/:id", Controller.getTransactionsById);
transactionRouter.patch(
  "/transactions/:id",
  authentication,
  Controller.updateTransaction
);
transactionRouter.delete(
  "/transactions/:id",
  authentication,
  // authorization,
  Controller.deleteTransaction
);

module.exports = transactionRouter;
