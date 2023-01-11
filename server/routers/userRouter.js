const router = require("express").Router();
const Controller = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares");

router.post("/users/register", Controller.usersRegister);
router.post("/users/login", Controller.usersLogin);
router.post("/users/facebooklogin", Controller.usersLogin);


module.exports = router;
