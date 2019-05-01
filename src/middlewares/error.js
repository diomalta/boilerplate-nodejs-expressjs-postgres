const logger = require('../config/winston')(__filename)
const config = require('../config/env')

const stream = {
  write: message => {
    logger.info(message)
  }
}

const errorHandler = {
  handleError: error => {
    logger.error(`${error.code || 500} - ${error.message}`)
    switch (error.errorType) {
      default:
        return true
    }
  },
  isTrustedError: error => error.isOperational
}

const errorMiddleware = (err, req, res, next) => {
  logger.error(
    `${err.code || 500}${
      req.usuario_id ? ` - usuario_id: ${req.usuario_id}` : ''
    } - errMsg: ${err.message} - url: ${req.originalUrl} - method: ${
      req.method
    } - ip: ${req.ip} - error: ${JSON.stringify(err, null, 2)}`
  )

  if (!err.isOperational && config.env.local !== 'test') {
    return process.exit(1)
  }

  switch (err.errorType) {
    default:
      return res.status(err.code || 200).json(err)
  }
}

const notFoundHandler = (req, res) => {
  res.status(404).send()
}

module.exports = {
  errorMiddleware,
  errorHandler,
  notFoundHandler,
  stream
}
