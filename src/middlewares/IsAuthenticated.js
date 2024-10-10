const { JWT_KEY } = require("../config/serverconfig");
const jwt = require("jsonwebtoken");

const UserRepository = require("../repository/user-repository");
const userRepository = new UserRepository();

const isAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await userRepository.getById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "Something went wrong in the authentication middleware",
      error
    );
    return res.status(500).json({ error: "Internal server error/token expired" });
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (error) {
    console.error("Error verifying token", error);
    throw error;
  }
};

module.exports = isAuthenticated;
