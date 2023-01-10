const { User } = require("../models/index");
const { decodeToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    let access_token  = req.headers.access_token;
    if (!access_token) {
      throw {
        name: "Unauthenticated",
      };
    }
    let token = decodeToken(access_token)
    let user = await User.findByPk(token.id);
    if (user) {
      req.user = {
        id: user.id,
        role: user.role,
        email: user.email
      };
      next();
    } else {
      throw { name: "Unauthenticated" };
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { authentication, /* , transactionAuthentication  */};
