const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const env = require('../../config/env')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (pass) {
    return bcrypt.compare(pass, this.password)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, env.appSecret)
  }

  return User
}
