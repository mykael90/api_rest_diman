const data = require('../JSON/roleTypesJSON.json');

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
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_roletypes', arr, {});
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
