module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workers_tasks_statuses_photos', {
      filename: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      worker_task_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workers_tasks_statuses',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('workers_tasks_statuses_photos');
  },
};
