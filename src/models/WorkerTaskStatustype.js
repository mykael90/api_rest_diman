import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskStatustype extends Model {
  static associate(models) {
    this.hasMany(models.WorkersTasks, { foreignKey: 'status_type_id' });
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
      { sequelize, tableName: 'workers_tasks_statustype', timestamps: false }
    );
    return this;
  }
}
