import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatusPhoto extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTaskStatus, {
      sourceKey: 'id',
      foreignKey: 'WorkerTaskStatusId',
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
      },
      {
        sequelize,
        tableName: 'workers_tasks_statuses_photos',
        timestamps: false,
      }
    );
    return this;
  }
}
