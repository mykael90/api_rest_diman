module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_inventory', // table name
        'user_id_initial_quantity', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'materials_inventory', // table name
        'date_initial_quantity', // new field name
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
