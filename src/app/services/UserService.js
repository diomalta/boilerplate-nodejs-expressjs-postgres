const { User } = require('../models')
const Response = require('../../constants/response')

class UserService {
  constructor () {
    this.user = User
  }

  async store (body) {
    const user = await this.check(body.email)

    if (!user) {
      return {
        user: await this.user.create({ ...body }),
        ...Response.userCreated
      }
    }

    return Response.userFound
  }

  async update (body) {
    const user = await this.user.findByPk(body.id)

    if (!user) {
      return Response.userNotFound
    }

    const userAtt = await user.update({ ...body })

    return {
      user: userAtt,
      ...Response.userOk
    }
  }

  check (email) {
    return this.user.findOne({ where: { email } })
  }

  async get (id) {
    const user = await this.user.findByPk(id)

    if (!user) {
      return Response.userNotFound
    }

    return {
      user,
      ...Response.userOk
    }
  }

  async destroy (id) {
    const user = await this.user.findByPk(id)

    if (!user) {
      return Response.userNotFound
    }

    await user.destroy()

    return Response.userDeleted
  }
}

module.exports = new UserService()
