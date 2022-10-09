const data = require('../JSON/usersRoletypes.json');

const date = new Date();
const dateMariaDB = `${date.getUTCFullYear()}-${
  (`00${date.getUTCMonth() + 1}`).slice(-2)}-${
  (`00${date.getUTCDate()}`).slice(-2)} ${
  (`00${date.getUTCHours()}`).slice(-2)}:${
  (`00${date.getUTCMinutes()}`).slice(-2)}:${
  (`00${date.getUTCSeconds()}`).slice(-2)}`;

function removeAccent(text) {
  text = text.toUpperCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'A');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'E');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'I');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'O');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'U');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'C');
  return text;
}

data.forEach((obj) => {
  obj.description = removeAccent(obj.description);
  obj.created_at = dateMariaDB;
  obj.updated_at = dateMariaDB;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_roletypes', data, {});
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
