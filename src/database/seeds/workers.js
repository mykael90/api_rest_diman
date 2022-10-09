const data = require('../JSON/workers.json');

const date = new Date();
const dateMariaDB = `${date.getUTCFullYear()}-${
  (`00${date.getUTCMonth() + 1}`).slice(-2)}-${
  (`00${date.getUTCDate()}`).slice(-2)} ${
  (`00${date.getUTCHours()}`).slice(-2)}:${
  (`00${date.getUTCMinutes()}`).slice(-2)}:${
  (`00${date.getUTCSeconds()}`).slice(-2)}`;

data.forEach((obj) => {
  obj.created_at = dateMariaDB;
  obj.updated_at = dateMariaDB;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('workers', data, {});
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
