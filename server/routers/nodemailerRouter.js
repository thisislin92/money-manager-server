const nodemailerRouter = require("express").Router();
const Controller = require("../controllers/nodemailerController");


nodemailerRouter.get("/nodemailer/:email", Controller.sendMail);

module.exports = nodemailerRouter;
