module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('users_positions', 'position_id', 'user_positiontype_id');
  },

  down() {
  },
};
