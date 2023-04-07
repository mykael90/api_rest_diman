import Sequelize, { Model } from 'sequelize';

export default class WorkerTaskRisk extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTask);
    this.belongsTo(models.WorkerTaskRisktype);
    // Define model associations
  }

  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'workers_tasks_risks',
        timestamps: false,
      }
    );
    return this;
  }
}
