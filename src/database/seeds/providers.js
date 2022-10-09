const data = require('../JSON/providers.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('providers', data, {});
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
