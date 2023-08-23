import Sequelize, { Model } from 'sequelize';

export default class CarAccessory extends Model {
  static associate(models) {
    this.belongsTo(models.CarAccessorytype);
    this.belongsTo(models.Car);
  }

  static init(sequelize) {
    super.init(
      {
        payload: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dimension: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        obs: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'cars_accessories', timestamps: true },
    );
    return this;
  }
}
