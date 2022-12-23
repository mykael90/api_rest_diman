module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users', // table name
      'username', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true, (não utilizado pois causou conflito)
      },
    );
  },

  down() {
  },
};
