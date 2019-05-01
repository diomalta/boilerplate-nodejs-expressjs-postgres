const AuthService = require('../services/AuthService')
const ErrorService = require('../services/ErrorService')

class AuthController {
  async store (req, res, next) {
    try {
      const response = await AuthService.store(req.body)

      if (response.status !== 201) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res.status(201).json({ ...response })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = new AuthController()
