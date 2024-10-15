const { ACCESS_TOKEN_SECRET} = require("../config/serverconfig");
const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes')

const UserRepository = require("../repository/user-repository");
const userRepository = new UserRepository();

const isAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" });
    }

    const user = await userRepository.getById(decodedToken.id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token expired" });
    }
    console.error(
      "Something went wrong in the authentication middleware",
      error
    );
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.error("Error verifying token", error);
    throw error;
  }
};

module.exports = isAuthenticated;
