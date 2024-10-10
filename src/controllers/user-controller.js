const UserService = require("../services/user-service");

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const response = await userService.signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: {},
      success: false,
      err: error,
    });
  }
};

const signin = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(201).json({
      success: true,
      message: "Successfully signIN",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
      err: error,
    });
  }
};

module.exports = {
  signup,
  signin,
};
