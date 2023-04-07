import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatus extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTask);
    this.belongsTo(models.WorkerTaskStatustype);
    this.belongsTo(models.User);
    this.hasMany(models.WorkerTaskStatusPhoto, {
      sourceKey: 'WorkerTaskId',
      foreignKey: 'WorkerTaskId',
    });
    // this.hasMany(models.WorkerTaskStatusPhoto, {
    //   sourceKey: 'WorkerTaskStatustypeId',
    //   foreignKey: 'WorkerTaskStatustypeId',
    // });
  }

  static init(sequelize) {
    super.init(
      {},
      { sequelize, tableName: 'workers_tasks_statuses', timestamps: false }
    );
    return this;
  }
}
