const data = require('../JSON/workers_tasks_riskstypes.json');

function transformValuesToUpperCase(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      obj[key] = transformValuesToUpperCase(obj[key]); // Recursively call the function for nested objects
    } else if (typeof obj[key] === 'string') {
      obj[key] = obj[key].toUpperCase(); // Transform string values to uppercase
    }
  }
  return obj;
}

data.forEach((obj) => {
  // delete obj['sub-rip'];
  transformValuesToUpperCase(obj);
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('workers_tasks_riskstypes', data, {});
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
