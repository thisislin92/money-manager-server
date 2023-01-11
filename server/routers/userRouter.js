const router = require("express").Router();
const Controller = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares");
const FacebookTokenStrategy = require("passport-facebook-token");
const passport = require("passport");
const { User } = require("../models");
const { generateTokenForUser } = require("../helpers/jwt");

passport.use(
  "facebook-token",
  new FacebookTokenStrategy(
    {
      clientID: "2984034805226590",
      clientSecret: "a587d0f510e5afe3ee077448898b1ed8",
      fbGraphVersion: "v15.0",
      profileFields: ["id", "emails", "name"],
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, cb) {
      try {
        // console.log(accessToken);
        // console.log(profile);
        const email = `${profile.name.givenName.toLowerCase()}@facebook.com`;
        let userLogin = await User.findOne({ where: { email } });

        if (!userLogin) {
          userLogin = await User.create({
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            email,
            password: "facebooklogin-default-password",
          });
        }

        // directly allow generating access_token even if the user is autocreated
        const token = {
          id: userLogin.id,
          user: userLogin.name,
          email: userLogin.email,
        };
        let access_token = generateTokenForUser(token);

        // this is used to pass data from passport to handler in controller, so that express can respond as a JSON object
        req.callbackResponse = {
          id: userLogin.id,
          accessToken: access_token
        };
        return cb(null, {
          id: userLogin.id,
          access_token,
          name: userLogin.username,
        });
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

router.post("/users/register", Controller.usersRegister);
router.post("/users/login", Controller.usersLogin);
router.post(
  "/users/facebooklogin",
  passport.authenticate("facebook-token", {
    session: false,
  }),
  Controller.facebookSignIn
);

router.get(
  "/users/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.post(
  "/users/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
