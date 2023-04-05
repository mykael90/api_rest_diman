import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskServant extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTask);
    this.belongsTo(models.User);
  }

  static init(sequelize) {
    super.init(
      {

      },
      { sequelize, tableName: 'workers_tasks_servants', timestamps: false },
    );
    return this;
  }
}
