const UserService = require('../services/UserService')
const ErrorService = require('../services/ErrorService')

const HTTP = require('../../constants/http')

class UserController {
  async store (req, res, next) {
    try {
      const { body } = req
      const response = await UserService.store(body)

      if (response.status !== HTTP.CREATED) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res
        .status(HTTP.CREATED)
        .json({ user: response.user, message: response.describe })
    } catch (err) {
      return next(err)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const { body } = req

      const response = await UserService.update({ ...body, id })

      if (response.status !== HTTP.OK) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res
        .status(HTTP.OK)
        .json({ user: response.user, message: response.describe })
    } catch (err) {
      return next(err)
    }
  }

  async destroy (req, res, next) {
    try {
      const { id } = req.params

      const response = await UserService.destroy(id)

      if (response.status !== HTTP.OK) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res.status(response.status).json({ message: response.describe })
    } catch (err) {
      return next(err)
    }
  }

  async get (req, res, next) {
    try {
      const { id } = req.params

      const response = await UserService.get(id)

      if (response.status !== HTTP.OK) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res
        .status(HTTP.OK)
        .json({ user: response.user, message: response.menssage })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = new UserController()
