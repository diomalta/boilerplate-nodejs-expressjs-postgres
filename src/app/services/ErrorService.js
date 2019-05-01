class ErrorService {
  constructor (req, object) {
    this.req = req
    this.type = object.type
    this.describe = object.describe
    this.status = object.status
  }

  get () {
    const error = new Error(this.describe)
    error.code = this.status
    error.isOperational = true
    error.errorType = this.type
    error.body = this.req.body
    return error
  }
}

module.exports = ErrorService
