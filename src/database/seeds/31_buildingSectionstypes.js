const data = require('../JSON/buildings_sectionstypes.json');

// data.forEach((obj) => {
//   delete obj['sub-rip'];
// });

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buildings_sectionstypes', data, {});
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
