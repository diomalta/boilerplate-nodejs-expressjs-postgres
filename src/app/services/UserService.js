const { User } = require('../models')

class UserService {
  constructor () {
    this.user = User
  }

  async store (body) {
    const user = await this.check(body.email)

    if (!user) {
      return {
        user: await this.user.create({ ...body }),
        status: 201,
        describe: 'User registered with success'
      }
    }

    return {
      type: 'userFound',
      status: 400,
      describe: 'Already exist a user with email'
    }
  }

  async update (body) {
    const user = await this.user.findByPk(body.id)

    if (!user) {
      return {
        type: 'userNotFound',
        status: 400,
        describe: 'No user found'
      }
    }

    const userAtt = await user.update({ ...body })

    return {
      user: userAtt,
      status: 200,
      describe: 'User updated with success'
    }
  }

  check (email) {
    return this.user.findOne({ where: { email } })
  }

  async get (id) {
    const user = await this.user.findByPk(id)

    if (!user) {
      return {
        type: 'userNotFound',
        status: 400,
        describe: 'No user found'
      }
    }

    return {
      user,
      status: 200,
      describe: 'User successfully found'
    }
  }

  async destroy (id) {
    const user = await this.user.findByPk(id)

    if (!user) {
      return {
        type: 'userNotFound',
        status: 400,
        describe: 'No user found'
      }
    }

    await user.destroy()

    return {
      status: 200,
      describe: 'User deleted with success'
    }
  }
}

module.exports = new UserService()
