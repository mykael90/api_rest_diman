module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('users_positions', 'matSiape', 'mat_siape');
  },

  down() {
  },
};
