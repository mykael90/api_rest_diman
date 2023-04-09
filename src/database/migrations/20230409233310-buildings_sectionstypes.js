module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('buildings_sectionstypes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('buildings_sectionstypes');
  },
};
