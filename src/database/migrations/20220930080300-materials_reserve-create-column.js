module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_reserve', // table name
        'intended_use', // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
