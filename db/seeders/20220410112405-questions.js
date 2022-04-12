/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('@faker-js/faker');

const questions = [...Array(50)].map((user) => ({
  user_id: faker.faker.datatype.number({ min: 1, max: 50 }),
  title: faker.faker.lorem.sentence(),
  description: faker.faker.lorem.sentence(),
  is_answered: faker.faker.datatype.boolean(),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: 1,
  updated_by: 1,
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', questions, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  },
};
