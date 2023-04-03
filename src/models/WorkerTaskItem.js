import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskItem extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTask, { foreignKey: 'worker_task_id' });
    this.belongsTo(models.Worker, { foreignKey: 'worker_id' });
  }

  static init(sequelize) {
    super.init(
      {
        workerTaskId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        workerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      { sequelize, tableName: 'workers_tasks_items', timestamps: false }
    );
    return this;
  }
}
