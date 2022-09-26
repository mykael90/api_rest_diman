import Sequelize, { Model } from 'sequelize';

export default class WorkersContract extends Model {
  static associate(models) {
    this.belongsTo(models.Worker);
    this.belongsTo(models.Contract);
    this.belongsTo(models.WorkerJobtype);
  }

  static init(sequelize) {
    super.init(
      {
        start: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        end: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'workers_contracts', timestamps: false }
    );
    return this;
  }
}
