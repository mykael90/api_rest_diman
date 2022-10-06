import Sequelize, { Model } from 'sequelize';

export default class WorkerAddress extends Model {
  // static associate(models) {
  // }

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
