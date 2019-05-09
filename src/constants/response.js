const HTTP = require('./http')

module.exports = {
  userNotFound: {
    type: 'userNotFound',
    status: HTTP.BAD_REQUEST,
    describe: 'User not found'
  },

  incorretPassword: {
    type: 'incorretPassword',
    status: HTTP.UNAUTHENTICATED,
    describe: 'Incorrect password'
  }
}
