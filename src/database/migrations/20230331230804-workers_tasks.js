module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workers_tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      req_maintenance: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      worker_tasktype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'workers_taskstypes',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      place: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      property_sipac_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      building_sipac_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      extra_activity: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: 'atividade extra',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('workers_tasks');
  },
};
