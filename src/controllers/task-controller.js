const TaskService = require("../services/task-service");
const taskservice = new TaskService();
const {StatusCodes} = require('http-status-codes')


const createtask = async (req, res) => {
  try {
    const response = await taskservice.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      userId: req.user.id,
      priority: req.body.priority,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a new task",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const getALLTask = async (req, res) => {
  try {
    const response = await taskservice.getAll();
    return res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Successfully fetach all the tasks",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
const getTask = async (req, res) => {
  try {
    const response = await taskservice.get(req.params.id);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully featch the tasks",
      data: response,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "something went wrong",
      success: false,
      err: error,
    });
  }
};
const update = async (req, res) => {
  try {
    const response = await taskservice.updateTask(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: " Task updated sucesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "not able to update a Task",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await taskservice.deleteTask(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Task deleted sucesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "not able to delete a Task",
      err: error,
    });
  }
};

module.exports = {
  createtask,
  getALLTask,
  getTask,
  update,
  destroy,
};
