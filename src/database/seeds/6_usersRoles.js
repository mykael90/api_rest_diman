/* eslint-disable no-restricted-syntax */
const data = require('../JSON/usersRoles.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_roles', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
