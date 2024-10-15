const UserService = require("../services/user-service");
const userService = new UserService();
const {StatusCodes} = require('http-status-codes')

const signup = async (req, res) => {
  try {
    const response = await userService.signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      data: {},
      success: false,
      err: error,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await userService.signIn(
      req.body.email,
      req.body.password
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully signed in",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "something went wrong",
      success: false,
      err: error,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  try {
    const accessToken = await userService.refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(StatusCodes.FORBIDDEN).json({ error: error.message });
  }
};

module.exports = {
  signup,
  signin,
  refreshAccessToken,
};
