module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('cars', 'year', {
      type: Sequelize.INTEGER(9),
      allowNull: false,
    });
  },

  down() {
  },
};
