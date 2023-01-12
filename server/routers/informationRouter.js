const informationRouter = require("express").Router();
const Controller = require("../controllers/informationController");
const { authentication } = require("../middlewares");

informationRouter.get("/information/crypto", Controller.getCryptoPrices);

module.exports = informationRouter;
