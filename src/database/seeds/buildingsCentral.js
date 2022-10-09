const data = require('../JSON/buildings_central.json');

data.forEach((obj) => {
  delete obj.rip_id;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buildings_sipac', data, {});
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
