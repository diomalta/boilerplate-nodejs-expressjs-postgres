const UserService = require('../services/UserService')
const ErrorService = require('../services/ErrorService')

class UserController {
  async store (req, res, next) {
    try {
      const { body } = req
      const response = await UserService.store(body)

      if (response.status !== 201) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res
        .status(201)
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

      if (response.status !== 200) {
        const e = new ErrorService(req, response)
        return next(e.get())
      }

      return res
        .status(response.status)
        .json({ user: response.user, message: response.describe })
    } catch (err) {
      return next(err)
    }
  }

  async destroy (req, res, next) {
    try {
      const { id } = req.params

      const response = await UserService.destroy(id)

      if (response.status !== 200) {
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

      const user = await UserService.get(id)

      if (!user) {
        return res.status(400).json({ message: 'No user found' })
      }

      return res.status(200).json({ user, message: 'User successfully found' })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = new UserController()
