const data = require('../JSON/materials3024JSON.json');

const arr = data.sipac;

arr.forEach((obj) => {
  delete obj.date_record;
  obj.name = obj.name.toUpperCase();
  obj.specification = obj.specification.toUpperCase();
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materials', arr, {});
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
