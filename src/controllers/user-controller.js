const jwt = require("jsonwebtoken");
const UserService = require("../services/user-service");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/serverconfig");

const userService = new UserService();

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

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
    const { user, accessToken, refreshToken } = await userService.signIn(
      req.body.email,
      req.body.password
    );

    return res.status(201).json({
      success: true,
      message: "Successfully signed in",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
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
    res.status(403).json({ error: error.message });
  }
};

module.exports = {
  signup,
  signin,
  refreshAccessToken,
};
