import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatus extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTask);
    this.belongsTo(models.WorkerTaskStatustype);
    this.belongsTo(models.User);
    this.hasMany(models.WorkerTaskStatusPhoto, {
      foreignKey: 'WorkerTaskStatusId',
    });
    // this.hasMany(models.WorkerTaskStatusPhoto, {
    //   sourceKey: 'WorkerTaskStatustypeId',
    //   foreignKey: 'WorkerTaskStatustypeId',
    // });
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      { sequelize, tableName: 'workers_tasks_statuses', timestamps: true }
    );
    return this;
  }
}
