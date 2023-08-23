import Sequelize, { Model } from 'sequelize';

export default class CarStatustype extends Model {
  static associate(models) {
    this.hasMany(models.CarStatus);
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

      { sequelize, tableName: 'cars_statusestypes', timestamps: false },
    );
    return this;
  }
}
