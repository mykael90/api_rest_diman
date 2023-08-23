module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'cars_occurrences_photos', // table name
        'width', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'cars_occurrences_photos', // table name
        'height', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
    ]);
  },

  down() {
  },
};
