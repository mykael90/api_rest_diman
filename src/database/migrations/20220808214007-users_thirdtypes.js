module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users_thirdtypes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      job: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users_thirdtypes');
  },
};
