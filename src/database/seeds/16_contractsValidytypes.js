const data = require('../JSON/contractsValidytype.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contracts_validytype', data, {});
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
