const routes = require('express').Router()

const UserController = require('../app/controllers/UserController')
const AuthController = require('../app/controllers/AuthController')

// Authentication routes
routes.post('/signin', AuthController.store)

// User routes
routes.post('/', UserController.store)
routes.put('/:id', UserController.update)
routes.get('/:id', UserController.get)
routes.delete('/:id', UserController.destroy)

module.exports = routes
