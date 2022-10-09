import Sequelize, { Model } from 'sequelize';

export default class ContractValidyItem extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerJobtype);
  }

  static init(sequelize) {
    super.init(
      {
        workerJobtypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        value: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'contracts_validy_items',
        timestamps: false,
      }
    );
    return this;
  }
}
