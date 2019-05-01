const {
  errorMiddleware,
  notFoundHandler,
  errorHandler,
  stream
} = require('../middlewares/error')
const logger = require('./winston')(__filename)

class Core {
  constructor () {
    this.errorMiddleware = errorMiddleware
    this.notFoundHandler = notFoundHandler
    this.errorHandler = errorHandler
    this.stream = stream
    this.logger = logger
  }
}

module.exports = new Core()
