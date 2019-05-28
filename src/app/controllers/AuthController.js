const AuthService = require('../services/AuthService')
const ErrorService = require('../services/ErrorService')
const HTTP = require('../../constants/http')

class AuthController {
  async store (req, res, next) {
    try {
      const response = await AuthService.store(req.body)

      if (response.status !== HTTP.CREATED) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res.status(HTTP.CREATED).json({ ...response })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = new AuthController()
