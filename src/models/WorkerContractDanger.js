import Sequelize, { Model } from 'sequelize';

export default class WorkerContractDanger extends Model {
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
        danger: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        percentage: {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: false,
        },
      },

      { sequelize, tableName: 'workers_contracts_dangers', timestamps: false },
    );
    return this;
  }
}
