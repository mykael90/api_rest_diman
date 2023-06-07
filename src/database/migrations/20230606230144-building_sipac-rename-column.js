module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('buildings_sipac', 'coordinates', 'geo');
  },
  down() {},
};
