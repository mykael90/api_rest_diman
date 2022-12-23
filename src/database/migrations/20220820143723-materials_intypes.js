module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('materials_intypes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('materials_intypes');
  },
};
