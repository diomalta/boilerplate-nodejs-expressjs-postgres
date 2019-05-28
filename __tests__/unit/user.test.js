const bcrypt = require('bcryptjs')

const factory = require('../../src/utils/factories')
const truncate = require('../../src/utils/truncate')

describe('Unit > User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const compareHash = await bcrypt.compare('123456', user.password)

    expect(compareHash).toBe(true)
  })

  it('should no encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const compareHash = await bcrypt.compare('1236454456', user.password)

    expect(compareHash).toBe(false)
  })
})
