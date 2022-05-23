module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('users', 'nome', 'name');
  },

  down() {
  },
};
