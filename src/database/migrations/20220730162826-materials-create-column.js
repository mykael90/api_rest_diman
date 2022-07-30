module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'materials', // table name
      'is_active', // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        // unique: true, (não utilizado pois causou conflito)
      },
    );
  },

  down() {
  },
};
