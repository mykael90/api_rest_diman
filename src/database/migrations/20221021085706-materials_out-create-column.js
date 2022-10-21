module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_out', // table name
        'userReplacement', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
