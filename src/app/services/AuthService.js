const { User } = require('../models')

const HTTP = require('../../constants/http')
const Response = require('../../constants/response')

class AuthService {
  constructor (user) {
    this.user = user
  }

  async store (body) {
    const { email, password } = body
    const user = await this.user.findOne({ where: { email } })

    if (!user) {
      return Response.userNotFound
    }

    if (!(await user.checkPassword(password))) {
      return Response.incorretPassword
    }

    return {
      user,
      status: HTTP.CREATED,
      token: user.generateToken()
    }
  }
}

module.exports = new AuthService(User)
