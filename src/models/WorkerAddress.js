import Sequelize, { Model } from 'sequelize';

export default class WorkerAddress extends Model {
  static associate(models) {
    this.belongsTo(models.Worker);
    this.belongsTo(models.Address);
  }

  static init(sequelize) {
    super.init(
      {
        addressType: {
          type: Sequelize.INTEGER,
        },
      },

      { sequelize, tableName: 'workers_addresses', timestamps: false }
    );
    return this;
  }
}
