module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workers_tasks_status_photos', {
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      worker_task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'workers_tasks_status',
          },
          key: 'worker_task_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      worker_task_statustype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'workers_tasks_status',
          },
          key: 'workers_task_statustype_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('workers_tasks_status_photos');
  },
};
