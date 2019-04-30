const faker = require('faker')

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
}
