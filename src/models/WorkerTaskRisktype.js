import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskRisktype extends Model {
  static associate(models) {
    this.belongsToMany(models.WorkersTask, {
      through: models.WorkersTasksRisk,
    });
    this.hasMany(models.WorkerTaskRisk);
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
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      },
      { sequelize, tableName: 'workers_tasks_riskstypes', timestamps: false }
    );
    return this;
  }
}
