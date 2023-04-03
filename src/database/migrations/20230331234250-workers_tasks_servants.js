module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('worker_tasks_servants', {
      worker_task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workers_tasks',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('worker_tasks_servants');
  },
};
