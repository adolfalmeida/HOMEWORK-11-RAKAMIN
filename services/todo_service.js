const TodoRepository = require("../repositories/todo_repository.js");

class TodoService {
  static async register(data) {
    const { title, completed, user_id } = data;

    const todo = await TodoRepository.register({
      title,
      completed,
      user_id,
    });

    return todo;
  }

  static async get(page) {
    const { userId, limit, offset } = page;
    const data = await TodoRepository.findPage(userId, limit, offset);
    return data;
  }

  static async updateTodo(data) {
    const { id, title, completed, user_id } = data;
    const todo = await TodoRepository.updateTodo(id, title, completed, user_id);
    return todo;
  }

  static async getById(id) {
    const todo = await TodoRepository.findTodo(id);
    if (!todo) {
      throw new Error("no user with id= " + id + " not found!");
    }
    return todo;
  }

  static async delete(id) {
    const data = await TodoRepository.delete(id);
  }
}

module.exports = TodoService;