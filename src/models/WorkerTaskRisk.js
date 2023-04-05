import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskRisk extends Model {
  static associate(models) {
    // this.hasMany(models.WorkerTask);
    // this.hasMany(models.WorkerTaskRisktype);
    // Define model associations
  }

  static init(sequelize) {
    super.init(
      {

      },
      {
        sequelize,
        tableName: 'workers_tasks_risks',
        timestamps: false,
      },
    );
    return this;
  }
}
