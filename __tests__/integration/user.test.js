const faker = require('faker')
const request = require('supertest')

const app = require('../../src/app')
const factory = require('../../src/utils/factories')
const HTTP = require('../../src/constants/http')

describe('User > UserController.js', () => {
  describe('Store', () => {
    it('User registered with success', async () => {
      const response = await request(app)
        .post('/api')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        })

      expect(response.status).toBe(HTTP.CREATED)
    })

    it('Already exist a user with email', async () => {
      const user = await factory.create('User', {
        email: 'joe@nothing.com'
      })

      const response = await request(app)
        .post('/api')
        .send({
          name: faker.name.findName(),
          email: user.email,
          password: faker.internet.password()
        })

      expect(response.status).toBe(HTTP.BAD_REQUEST)
    })
  })

  describe('Update', () => {
    it('User updated with success', async () => {
      const user = await factory.create('User', {
        email: 'john@nothing.com'
      })

      const response = await request(app)
        .put(`/api/${user.id}`)
        .send({
          name: faker.name.findName(),
          password: faker.internet.password()
        })

      expect(response.status).toBe(HTTP.OK)
    })

    it('No user found', async () => {
      const response = await request(app)
        .put('/api/4000000')
        .send({
          name: faker.name.findName(),
          password: faker.internet.password()
        })

      expect(response.status).toBe(HTTP.BAD_REQUEST)
    })
  })

  describe('Get', () => {
    it('User successfully found', async () => {
      const user = await factory.create('User', {
        email: 'snow@nothing.com'
      })

      const response = await request(app).get(`/api/${user.id}`)

      expect(response.status).toBe(HTTP.OK)
    })

    it('No user found', async () => {
      const response = await request(app).get('/api/4000000')

      expect(response.status).toBe(HTTP.BAD_REQUEST)
    })
  })

  describe('Destroy', () => {
    it('User deleted with success', async () => {
      const user = await factory.create('User', {
        email: 'stark@nothing.com'
      })

      const response = await request(app).delete(`/api/${user.id}`)

      expect(response.status).toBe(HTTP.OK)
    })

    it('No user found', async () => {
      const response = await request(app).delete('/api/0')

      expect(response.status).toBe(HTTP.BAD_REQUEST)
    })
  })
})
