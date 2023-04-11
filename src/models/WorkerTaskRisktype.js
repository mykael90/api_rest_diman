import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskRisktype extends Model {
  static associate(models) {
    this.belongsToMany(models.WorkerTask, {
      through: models.WorkerTaskRisk,
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
          type: Sequelize.STRING,
          allowNull: false,
        },
        desc: {
          type: Sequelize.TEXT,
        },
      },
      { sequelize, tableName: 'workers_tasks_riskstypes', timestamps: false },
    );
    return this;
  }
}
