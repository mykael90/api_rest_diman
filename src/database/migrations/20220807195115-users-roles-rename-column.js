module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('users_roles', 'role_id', 'user_roletype_id');
  },

  down() {
  },
};
