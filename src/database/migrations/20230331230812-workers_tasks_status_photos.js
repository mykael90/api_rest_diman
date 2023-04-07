module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workers_tasks_statuses_photos', {
      filename: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      worker_task_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        // references: { TEM QUE FAZER A REFERENCIA NO BANCO, NAO DEU CERTO POR AQUI
        //   model: {
        //     tableName: 'workers_tasks_statuses',
        //   },
        //   key: 'worker_task_id',
        // },
        // onUpdate: 'RESTRICT',
        // onDelete: 'RESTRICT',
      },
      worker_task_statustype_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        // references: { TEM QUE FAZER A REFERENCIA NO BANCO, NAO DEU CERTO POR AQUI
        //   model: {
        //     tableName: 'workers_tasks_statuses',
        //   },
        //   key: 'worker_task_statustype_id',
        // },
        // onUpdate: 'RESTRICT',
        // onDelete: 'RESTRICT',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('workers_tasks_statuses_photos');
  },
};
