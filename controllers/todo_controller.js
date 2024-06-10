const TodoService = require("../services/todo_service.js");

class TodoController {
  static async register(req, res, next) {
    const { title, completed, user_id } = req.body;

    try {
      const todo = await TodoService.register({
        title,
        completed,
        user_id,
      });

      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    const { userId } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const data = await TodoService.get({
        userId,
        limit,
        offset,
      });

      res.status(200).json({
        totalItems: data.count,
        totalPages: Math.ceil(data.count / limit),
        currentPage: parseInt(page),
        data: data.rows,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }

  static async updateTodo(req, res, next) {
    const { id } = req.params;
    const { title, completed, user_id } = req.body;
    try {
      const todo = await TodoService.updateTodo({
        id,
        title,
        completed,
        user_id,
      });

      return res.status(200).json({
        message: "Berhasil update data",
        todo,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const todo = await TodoService.getById(id);

      return res.status(200).json({
        message: "Berhasil mengambil data",
        todo,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const data = await TodoService.delete(id);

      return res.status(200).json({
        message: "Delete berhasil",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }
}

module.exports = TodoController;