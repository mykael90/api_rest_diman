import Sequelize, { Model } from 'sequelize';

export default class WorkerManualfrequencyItem extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerManualfrequency);
    this.belongsTo(models.WorkerManualfrequencytype);
    this.belongsTo(models.Worker);
  }

  static init(sequelize) {
    super.init(
      {
        // WorkerId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   primaryKey: true,
        // },
        hours: {
          type: Sequelize.DECIMAL(4, 2),
          allowNull: false,
        },
        obs: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'workers_manualfrequencies_items',
        timestamps: false,
      }
    );
    return this;
  }
}
