import Sequelize, { Model } from 'sequelize';

export default class CarOccurrencetype extends Model {
  static associate(models) {
    this.hasMany(models.CarOccurrence);
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

      { sequelize, tableName: 'cars_occurrencestypes', timestamps: false },
    );
    return this;
  }
}
