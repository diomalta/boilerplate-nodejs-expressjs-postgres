const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')
const path = require('path')
const config = require('./env')

const env = config.env || 'development'
const logDir = 'log'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const filename = path.join(logDir, '%DATE%.log')

const transportsConfig = [
  new transports.DailyRotateFile({
    filename,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
    format: format.combine(
      format.printf(
        info =>
          `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
      )
    )
  })
]

const logger = caller =>
  createLogger({
    // change level if in dev environment versus production
    level: env === 'production' ? 'info' : 'debug',
    format: format.combine(
      format.label({ label: path.basename(caller) }),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    transports: transportsConfig
  })

module.exports = logger
