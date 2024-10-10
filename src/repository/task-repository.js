const { Task } = require("../models/index");

class TaskRepository {
  async create(data) {
    try {
      const task = await Task.create(data);
      return task;
    } catch (error) {
      console.log("something went wrong at repository layer");
      throw error;
    }
  }
  async getAll() {
    try {
      const task = await Task.findAll();
      return task;
    } catch (error) {
      console.log("something went wrong at repository layer");
      throw error;
    }
  }

  async get(taskid) {
    try {
      const task = await Task.findByPk(taskid);
      return task;
    } catch (error) {
      console.log("something went wrong at repository layer");
      throw error;
    }
  }

  async updatetask(taskid, data) {
    try {
      const task = await Task.update(data, { where: { id: taskid } });
      return task;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }

  async deletetask(taskid) {
    try {
      await Task.destroy({ where: { id: taskid } });
      return true;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }
}
module.exports = TaskRepository;
