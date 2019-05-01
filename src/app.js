require('./config/env')

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const core = require('./config/core')

class AppController {
  constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
    this.errorManagement()
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(morgan('combined', { stream: core.stream }))
    this.express.use(helmet())
    this.express.use(express.json())
  }

  routes () {
    this.express.use('/api', require('./routes'))
  }

  errorManagement () {
    this.express.use(core.notFoundHandler)
    this.express.use(core.errorMiddleware)

    process.on('unhandledRejection', reason => {
      core.logger.info('Unhandled rejection, throwing')
      throw reason
    })

    process.on('uncaughtException', error => {
      core.logger.info('Unhandled exception, handling')

      core.errorHandler.handleError(error)
      if (!core.errorHandler.isTrustedError(error)) {
        process.exit(1)
      }
    })
  }
}

module.exports = new AppController().express
