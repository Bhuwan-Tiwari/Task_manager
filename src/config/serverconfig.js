const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
module.exports = {
  SALT: bcrypt.genSaltSync(10),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
