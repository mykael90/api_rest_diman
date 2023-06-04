module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn(
      'buildings_sections',
      'order',
      'position'
    );
  },
  down() {},
};
