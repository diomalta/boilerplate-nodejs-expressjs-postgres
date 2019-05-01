const dotenv = require('dotenv')

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  appSecret: process.env.APP_SECRET,
  portServer: process.env.PORT_SERVER,
  local: process.env.NODE_ENV,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    db: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT || 'postgres',
    port: process.env.DB_PORT
  },
  test: {
    storage: './__tests__/database.sqlite'
  }
}
