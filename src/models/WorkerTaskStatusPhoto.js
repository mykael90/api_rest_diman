import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatusPhoto extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTaskStatus);
    this.belongsTo(models.WorkerTaskStatustype);
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
      { sequelize, tableName: 'workers_tasks_status_photos', timestamps: false },
    );
    return this;
  }
}
