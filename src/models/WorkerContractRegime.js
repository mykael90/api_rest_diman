import Sequelize, { Model } from 'sequelize';

export default class WorkerContractRegime extends Model {
  static associate(models) {
    this.hasMany(models.WorkerContract);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        regime: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },

      { sequelize, tableName: 'workers_contracts_regimes', timestamps: false },
    );
    return this;
  }
}
