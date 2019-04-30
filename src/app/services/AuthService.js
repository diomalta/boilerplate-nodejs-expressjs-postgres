const { User } = require("../models");

class AuthService {
  constructor() {
    this.user = User;
  }

  async store(body) {
    const { email, password } = body;
    const user = await this.user.findOne({ where: { email } });

    if (!user) {
      return {
        status: 400,
        message: "User not found"
      };
    }

    if (!(await user.checkPassword(password))) {
      return {
        status: 401,
        message: "Incorrect password"
      };
    }

    return {
      user,
      status: 201,
      token: user.generateToken()
    };
  }
}

module.exports = new AuthService();
