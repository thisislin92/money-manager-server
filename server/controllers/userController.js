const {
  User
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
      const getAllUsers = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "staff", //TODO: pastiin lg mau pake role apa ga usah
      });

      res.status(201).json({ //TODO: sesuaikan sama api
        username: getAllUsers.username,
        email: getAllUsers.email,
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
        user: userFromDB.username,
        role: userFromDB.role,
      });
    } catch (error) {
      next(error);
    }
  }
  static async facebookSignIn(req, res, next) {
    try {
      let { authorization: tokenFromFacebook } = req.headers;
      tokenFromFacebook = tokenFromFacebook.split(" ")[1];
      const client = new OAuth2Client(`${process.env.GOOGLE_OAUTH_CLIENT_ID}`);

      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: tokenFromFacebook,
          audience: `${process.env.GOOGLE_OAUTH_CLIENT_ID}`, // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        return payload
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      }
      const profileResponse = await verify().catch((error) => {
        next(error);
      });

      const { email, name } = profileResponse;
      let userLogin = await User.findOne({ where: { email } });
      if (!userLogin) {
        userLogin = await User.create({
          username: name,
          email,
          password: "facebooklogin-default-password", // TODO: need mechanism to handle google login's password
          role: "staff",
          phoneNumber: "",
          address: "",
        });
      }

      // directly allow generating access_token even if the user is autocreated
      const token = {
        id: userLogin.id,
        user: userLogin.username,
        email: userLogin.email,
      };
      let access_token = createToken(token);
      res
        .status(200)
        .json({ id: userLogin.id, access_token, user: userLogin.username, role: userLogin.role });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;