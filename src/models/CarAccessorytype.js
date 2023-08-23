import Sequelize, { Model } from 'sequelize';

export default class CarAccessorytype extends Model {
  static associate(models) {
    this.hasMany(models.CarAccessory);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },

      { sequelize, tableName: 'cars_accessoriestypes', timestamps: false },
    );
    return this;
  }
}
