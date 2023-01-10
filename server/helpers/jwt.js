const jwt = require("jsonwebtoken");
const JWTSecret = "thisisasecret";

const generateTokenForUser = (userObject) => {
  return jwt.sign({ email: userObject.email, id: userObject.id }, JWTSecret);
};

const decodeToken = (access_token) => {
  return jwt.verify(access_token, JWTSecret);
};

module.exports = {
  decodeToken,
  generateTokenForUser,
};
