const { User } = require('../models')

class AuthService {
  constructor () {
    this.user = User
  }

  async store (body) {
    const { email, password } = body
    const user = await this.user.findOne({ where: { email } })

    if (!user) {
      return {
        type: 'userNotFound',
        status: 400,
        describe: 'User not found'
      }
    }

    if (!(await user.checkPassword(password))) {
      return {
        type: 'incorretPassword',
        status: 401,
        describe: 'Incorrect password'
      }
    }

    return {
      user,
      status: 201,
      token: user.generateToken()
    }
  }
}

module.exports = new AuthService()
