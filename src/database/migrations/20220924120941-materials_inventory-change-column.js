module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('materials_inventory', 'free_inventory', 'release_inventory');
  },
  down() {
  },
};
