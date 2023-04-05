import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskItem extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTask);
    this.belongsTo(models.Worker);
  }

  static init(sequelize) {
    super.init(
      {
      },
      { sequelize, tableName: 'workers_tasks_items', timestamps: false },
    );
    return this;
  }
}
