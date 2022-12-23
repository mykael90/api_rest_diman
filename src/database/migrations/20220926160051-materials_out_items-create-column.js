module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_out_items', // table name
        'value', // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
