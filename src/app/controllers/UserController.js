const UserService = require("../services/UserService");

class UserController {
  constructor() {
    this.userService = UserService;
  }

  async store(req, res, next) {
    try {
      const { body } = req;
      const user = await this.userService.store(body);

      if (!user) {
        return res
          .status(400)
          .json({ message: "Already exist a user with email" });
      }

      return res
        .status(201)
        .json({ user, message: "User registered with success" });
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;

      const user = await this.userService.update({ ...body, id });

      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }

      return res
        .status(200)
        .json({ user, message: "User updated with succes" });
    } catch (err) {
      return next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const user = await this.userService.destroy(id);

      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }

      return res
        .status(200)
        .json({ user, message: "User deleted with success" });
    } catch (err) {
      return next(err);
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params;

      const user = await this.userService.get(id);

      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }

      return res.status(200).json({ user, message: "User successfully found" });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UserController();
