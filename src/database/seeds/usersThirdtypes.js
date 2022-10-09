const data = require('../JSON/usersThirdtypes.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_thirdtypes', data, {});
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
