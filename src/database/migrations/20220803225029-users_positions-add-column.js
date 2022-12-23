module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users_positions', // table name
        'start', // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'users_positions', // table name
        'end', // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
