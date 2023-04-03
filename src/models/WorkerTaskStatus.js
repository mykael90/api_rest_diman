import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatus extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTask, {
      foreignKey: 'worker_task_id',
    });
    this.belongsTo(models.WorkerTaskStatusType, {
      foreignKey: 'workers_task_statustype_id',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.hasMany(models.WorkersTasksStatusPhoto, {
      foreignKey: 'worker_task_id',
    });
  }

  static init(sequelize) {
    super.init(
      {
        workersTaskStatustypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, tableName: 'workers_tasks_status', timestamps: false }
    );
    return this;
  }
}
