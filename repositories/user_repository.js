const { User } = require("../models");

class UserRepository {
  static async register(request) {
    try {
      const { name, email, hashedPassword } = request;
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return user;
    } catch (err) {
      console.log(err);
    }
  }

  static async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  static async findUser(id) {
    const user = await User.findByPk(id);
    return user;
  }

  static async findPage(limit, offset) {
    const status = true;
    const data = await User.findAndCountAll({
      where: { status },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    return data;
  }

  static async findUserEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  static async update(id, name, email) {
    let user = await User.update(
      {
        name: name,
        email: email,
      },
      { where: { id: id } }
    );
    user = await this.findUser(id);
    return user;
  }

  static async delete(id) {
    let user = await User.update(
      {
        status: false,
      },
      { where: { id: id } }
    );
    user = await this.findUser(id);
    return user;
  }
}

module.exports = UserRepository;
