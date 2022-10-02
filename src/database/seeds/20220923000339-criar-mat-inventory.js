const data1 = require('../JSON/materials3024JSON.json');
const data2 = require('../JSON/materials3026JSON.json');
const data3 = require('../JSON/materials3042JSON.json');
const data4 = require('../JSON/materials3044JSON.json');
const data5 = require('../JSON/materials3028JSON.json');

const data = [...data1.sipac, ...data2.sipac, ...data3.sipac, ...data4.sipac, ...data5.sipac];

const arr = data.map((item) => ({ material_id: item.id }));

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materials_inventory', arr, {});
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
