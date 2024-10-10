const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_KEY } = require('../config/serverconfig')


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

      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
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

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }
}

module.exports = UserService;
