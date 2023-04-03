import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatusPhoto extends Model {
  static associate(models) {
    this.belongsTo(models.WorkersTaskStatus, {
      foreignKey: 'worker_task_id',
      targetKey: 'worker_task_id',
    });
    this.belongsTo(models.WorkersTaskStatusType, {
      foreignKey: 'worker_task_statustype_id',
      targetKey: 'workers_task_statustype_id',
    });
  }

  static init(sequelize) {
    super.init(
      {
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        worker_task_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        worker_task_statustype_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      { sequelize, tableName: 'workers_tasks_status_photos', timestamps: false }
    );
    return this;
  }
}
