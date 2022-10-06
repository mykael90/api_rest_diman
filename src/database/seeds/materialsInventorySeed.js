const data = require('../JSON/materialsInventory.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materials_inventory', data, {});
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
