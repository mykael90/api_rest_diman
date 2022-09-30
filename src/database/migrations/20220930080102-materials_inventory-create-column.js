module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_inventory', // table name
        'reserve_inventory', // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
          defaultValue: 0,
        },
      )]);
  },

  down() {
  },
};
