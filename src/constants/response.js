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
  },

  userCreated: {
    type: 'userCreated',
    status: HTTP.CREATED,
    describe: 'User registered with success'
  },

  userFound: {
    type: 'userFound',
    status: HTTP.BAD_REQUEST,
    describe: 'Already exist a user with email'
  },

  userOk: {
    type: 'userOk',
    status: HTTP.OK,
    describe: 'User updated with success'
  },

  userDeleted: {
    type: 'userDeleted',
    status: HTTP.OK,
    describe: 'User deleted with success'
  }
}
