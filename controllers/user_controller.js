const UserService = require("../services/user_service.js");

class UserController {
  static async get(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const data = await UserService.get({
        limit,
        offset,
      });

      res.status(200).json({
        totalItems: data.count,
        totalPages: Math.ceil(data.count / limit),
        currentPage: parseInt(page),
        users: data.rows,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }

  static async register(req, res, next) {
    const { name, email, password } = req.body;

    try {
      const user = await UserService.register({
        name,
        email,
        password,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      let user = await UserService.login({
        email,
        password,
      });

      return res.status(200).json({
        message: "Login Berhasil",
        user: user.user,
        token: user.token,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await UserService.update({
        id,
        name,
        email,
      });

      return res.status(200).json({
        message: "Berhasil update data",
        user,
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
      const user = await UserService.getById(id);

      return res.status(200).json({
        message: "Berhasil mengambil data",
        user,
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
      const user = await UserService.delete(id);

      return res.status(200).json({
        message: "Delete sukses",
        user,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Server error",
      });
    }
  }
}

module.exports = UserController;
