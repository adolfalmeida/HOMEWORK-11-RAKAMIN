const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user_repository.js");
const SECRET_KEY = "secret";

class UserService {
  static async register(request) {
    const { name, email, password } = request;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await UserRepository.register({
      name,
      email,
      hashedPassword,
    });

    return user;
  }

  static async login(request) {
    const { email, password } = request;
    const user = await UserRepository.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid Credentials");
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { user: user, token: token };
  }

  static async get(page) {
    const { limit, offset } = page;
    const data = await UserRepository.findPage(limit, offset);
    return data;
  }

  static async update(data) {
    const { id, name, email } = data;
    const user = await UserRepository.update(id, name, email);
    return user;
  }

  static async getById(id) {
    const user = await UserRepository.findUser(id);
    if (!user) {
      throw new Error("User dengan id = " + id + " tidak ditemukan");
    }
    return user;
  }

  static async delete(id) {
    const user = await UserRepository.delete(id);
    if (!user) {
      throw new Error("User dengan id = " + id + " tidak ditemukan");
    }
    return user;
  }
}

module.exports = UserService;
