const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WorkerTaskServants extends Model {
    static associate(models) {
      WorkerTaskServants.belongsTo(models.WorkersTasks, {
        foreignKey: 'worker_task_id',
      });
      WorkerTaskServants.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  WorkerTaskServants.init(
    {
      worker_task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'workers_tasks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'WorkerTaskServants',
      tableName: 'worker_tasks_servants',
      timestamps: true,
      underscored: true,
    }
  );
  return WorkerTaskServants;
};
