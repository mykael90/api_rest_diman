/* eslint-disable no-restricted-syntax */
const data = require('../JSON/usersPositions.json');

for (const obj of data) {
  try {
    obj.start = obj.start.replace(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      '$3-$2-$1',
    );
    console.log(JSON.stringify(obj));
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_positions', data, {});
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
