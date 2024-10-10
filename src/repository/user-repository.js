const { User } = require("../models/index");

class UserRepository {
  async signup(data) {
    try {
        console.log(data.name)
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong at repository layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("something went wrong repositiry layer");
      throw error;
    }
  }
}
module.exports = UserRepository;
