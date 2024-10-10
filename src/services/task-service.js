const TaskRepository = require("../repository/task-repository");
const taskRepository = new TaskRepository();

class TaskService {
  async create(data) {
    try {
      const task = await taskRepository.create(data);
      return task;
    } catch (error) {
      console.log("something went wrong at service layer");
      throw error;
    }
  }

  async getAll() {
    try {
      const task = await taskRepository.getAll();
      return task;
    } catch (error) {
      console.log("something went wrong at service layer");
      throw error;
    }
  }
  async get(taskId) {
    try {
      const task = await taskRepository.get(taskId);
      return task;
    } catch (error) {
      console.log("something went wrong at service layer");
      throw error;
    }
  }

  async updateTask(taskid, data) {
    try {
      const task = await taskRepository.updatetask(taskid, data);
      return task;
    } catch (error) {
      console.log("something went wrong at service layer");
      throw error;
    }
  }

  async deleteTask(taskid) {
    try {
      const response = await taskRepository.deletetask(taskid);
      return response;
    } catch (error) {
      console.log("something went wrong at service layer");
      throw error;
    }
  }
}
module.exports = TaskService;
