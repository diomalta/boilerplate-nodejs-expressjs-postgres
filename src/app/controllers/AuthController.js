const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService")

class AuthController {
  async store(req, res, next) {
    try {
      const response = await AuthService.store(req.body);

      if (response.status !== 201) {
        return res.status(response.status).json({ message: response.message });
      }

      return res.status(201).json({ ...response });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new AuthController();
