import Sequelize, { Model } from 'sequelize';

export default class CarOccurrence extends Model {
  static associate(models) {
    this.belongsTo(models.CarOccurrencetype);
    this.belongsTo(models.Car);
    this.belongsTo(models.Worker);
    this.belongsTo(models.User);
    this.hasMany(models.CarOccurrencePhoto);
  }

  static init(sequelize) {
    super.init(
      {
        data: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        obs: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'cars_occurrences' },
    );
    return this;
  }
}
