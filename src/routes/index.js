const express = require("express");
const validateUserRegistration = require("../middlewares/validationMiddleware");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const TaskController = require("../controllers/task-controller");
const isAuthenticated = require("../middlewares/IsAuthenticated");

router.post("/auth/register", validateUserRegistration, UserController.signup);
router.post("/auth/login", validateUserRegistration, UserController.signin);
router.post("/tasks", isAuthenticated, TaskController.createtask);
router.get("/tasks", isAuthenticated, TaskController.getALLTask);
router.get("/tasks/:id", isAuthenticated, TaskController.getTask);
router.put("/tasks/:id", isAuthenticated, TaskController.update);
router.delete("/tasks/:id", isAuthenticated, TaskController.destroy);

module.exports = router;
