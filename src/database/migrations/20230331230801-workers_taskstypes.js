module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workers_taskstypes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(45),
        allowNull: false,
        comment: 'ATENDIMENTO ELÉTRICA; ATENDIMENTO CIVIL; ETC',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('workers_taskstypes');
  },
};
