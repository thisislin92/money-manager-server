const {
  User,
  Wallet
} = require("../models");
const {
  compareHash,
  hashPassword
} = require("../helpers/bcrypt");
const {
  generateTokenForUser
} = require("../helpers/jwt");

class Controller {
  static async usersRegister(req, res, next) {
    try {
      let {
        name,
        email,
        password,
      } = req.body;

      const hashedPassword = hashPassword(password)
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      Wallet.create({
        name: `${email}'s Default Wallet`,
        UserId: createdUser.id
      })

      res.status(201).json({
        username: createdUser.username,
        email: createdUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async usersLogin(req, res, next) {
    try {
      let {
        email,
        password
      } = req.body;
      if (!email) {
        throw {
          name: "MissingEmail"
        };
      }
      if (!password) {
        throw {
          name: "MissingPassword"
        }
      }
      const userFromDB = await User.findOne({
        where: {
          email
        }
      });
      if (!userFromDB) {
        throw {
          name: "InvalidCredentials"
        };
      }

      const hash = compareHash(password, userFromDB.password);
      if (!hash) {
        throw {
          name: "InvalidCredentials"
        };
      }

      const token = {
        id: userFromDB.id,
      };
      let access_token = generateTokenForUser(token);
      res.status(200).json({
        id: userFromDB.id,
        access_token,
        user: userFromDB.name,
      });
    } catch (error) {
      next(error);
    }
  }
  static async facebookSignIn(req, res, next) {
    try {
      res.json(req.callbackResponse)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;