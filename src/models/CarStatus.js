import Sequelize, { Model } from 'sequelize';

export default class CarStatus extends Model {
  static associate(models) {
    this.belongsTo(models.CarStatustype);
    this.belongsTo(models.Car);
    this.belongsTo(models.User);
  }

  static init(sequelize) {
    super.init(
      {
        obs: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'cars_statuses' },
    );
    return this;
  }
}
