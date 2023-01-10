const categoryRouter = require("express").Router();
const Controller = require("../controllers/categoryController");
const { authentication } = require("../middlewares");

categoryRouter.get("/categories", Controller.getAllCategories);

module.exports = categoryRouter;
