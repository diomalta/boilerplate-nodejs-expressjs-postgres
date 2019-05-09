const request = require('supertest')

const app = require('../../src/app')

const factory = require('../utils/factories')
const truncate = require('../utils/truncate')

const HTTP = require('../../src/constants/http')

describe('Auth > AuthController.js', () => {
  beforeAll(async () => {
    await truncate()
  })

  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/api/signin')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.status).toBe(HTTP.CREATED)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/api/signin')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(HTTP.UNAUTHENTICATED)
  })

  it('user not found', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({
        email: 'notexist@nothing.com',
        password: '123456'
      })

    expect(response.status).toBe(HTTP.BAD_REQUEST)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    })

    const response = await request(app)
      .post('/api/signin')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.body).toHaveProperty('token')
  })
})
