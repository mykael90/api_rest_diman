module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('cars_inspections_photos', 'width', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn('cars_inspections_photos', 'height', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down() {},
};
