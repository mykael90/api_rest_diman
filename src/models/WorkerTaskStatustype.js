import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatustype extends Model {
  static associate(models) {
    this.belongsToMany(models.WorkerTask, {
      through: models.WorkerTaskStatus,
    });
    this.hasMany(models.WorkerTaskStatus);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { sequelize, tableName: 'workers_tasks_statusestypes', timestamps: false }
    );
    return this;
  }
}
