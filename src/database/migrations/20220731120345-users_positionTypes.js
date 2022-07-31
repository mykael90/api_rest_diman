module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users_positiontypes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      position: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users_positiontypes');
  },
};
