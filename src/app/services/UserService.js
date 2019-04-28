const { User } = require("../models");

class UserService {
  constructor() {
    this.user = User;
  }

  async store(body) {
    const user = await this.check(body.email);

    if (!user) {
      return this.user.create({ ...body });
    }

    return false;
  }

  async update(body) {
    const user = await this.get(body.id);

    if (!user) {
      return false;
    }

    return user.update({ ...body });
  }

  check(email) {
    return this.user.findOne({ where: { email } });
  }

  get(id) {
    return this.user.findByPk(id);
  }

  getAll() {
    return this.user.findAll();
  }

  async destroy(id) {
    const user = await this.get(id);

    if (!user) {
      return false;
    }

    return user.destroy();
  }
}

module.exports = new UserService();
