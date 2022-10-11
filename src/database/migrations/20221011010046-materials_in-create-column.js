module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_in', // table name
        'provider_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ), queryInterface.addColumn(
        'materials_in', // table name
        'return_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
    ]);
  },

  down() {
  },
};
