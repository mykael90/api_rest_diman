/* eslint-disable no-restricted-syntax */
const bcryptjs = require('bcryptjs');
const data = require('../JSON/users.json');

const date = new Date();
const dateMariaDB = `${date.getUTCFullYear()}-${
  (`00${date.getUTCMonth() + 1}`).slice(-2)}-${
  (`00${date.getUTCDate()}`).slice(-2)} ${
  (`00${date.getUTCHours()}`).slice(-2)}:${
  (`00${date.getUTCMinutes()}`).slice(-2)}:${
  (`00${date.getUTCSeconds()}`).slice(-2)}`;

const sendData = async () => {
  for (const obj of data) {
    try {
      obj.password_hash = await bcryptjs.hash(String(obj.password), 8);
      obj.created_at = dateMariaDB;
      obj.updated_at = dateMariaDB;
      delete obj.password;
      console.log(JSON.stringify(obj));
    } catch (e) {
      console.log(e.message);
    }
  }
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await sendData();
    await queryInterface.bulkInsert('users', data, {});
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
