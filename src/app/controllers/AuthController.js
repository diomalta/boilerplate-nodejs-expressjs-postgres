const AuthService = require("../services/AuthService");

class AuthController {
  async store(req, res, next) {
    try {
      const response = await AuthService.store(req.body);

      if (response.status === 401) {
        return res.status(401).json({ message: response.message });
      }

      return res.status(200).json({ ...response });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}

module.exports = new AuthController();
