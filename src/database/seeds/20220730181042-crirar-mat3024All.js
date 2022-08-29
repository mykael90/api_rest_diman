const data = require('../JSON/materials3024JSON.json');

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
