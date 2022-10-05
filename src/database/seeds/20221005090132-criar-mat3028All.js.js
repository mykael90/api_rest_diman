const data = require('../JSON/materials3028JSON.json');

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

const arr = data.sipac;

arr.forEach((obj) => {
  delete obj.date_record;
  obj.name = removeAccent(obj.name);
  obj.unit = removeAccent(obj.unit);
  obj.specification = removeAccent(obj.specification);
  obj.created_at = dateMariaDB;
  obj.updated_at = dateMariaDB;
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
