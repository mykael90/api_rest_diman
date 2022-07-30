module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('materials', 'desc', 'name'),
      queryInterface.renameColumn('materials', 'desc_detailed', 'specification'),
      queryInterface.renameColumn('materials', 'unity', 'unit'),
      queryInterface.renameColumn('materials', 'is_active', 'is_inactive'),
    ]);
  },

  down() {
  },
};
