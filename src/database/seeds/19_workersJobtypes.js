const data = require('../JSON/workersJobtypes.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('workers_jobtypes', data, {});
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
