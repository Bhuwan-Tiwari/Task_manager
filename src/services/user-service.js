const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = require("../config/serverconfig");

const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.signup(data);
      return user;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      const passwordsMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordsMatch) {
        console.log("password doesnot match");
        throw { error: "Incorrect password" };
      }
      const accessToken =  this.generateAccessToken({ id: user.id });
      const refreshToken = this.generateRefreshToken({ id: user.id });
      return { user, accessToken, refreshToken };
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  checkPassword(userPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("somethinf went wroong in service layer");
      throw error;
    }
  }

  generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  }

  generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    try {
      const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const accessToken = this.generateAccessToken({ id: user.id });
      return accessToken;
    } catch (error) {
      console.log("Invalid refresh token");
      throw new Error("Invalid refresh token");
    }
  }
}

module.exports = UserService;
