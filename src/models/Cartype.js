import Sequelize, { Model } from 'sequelize';

export default class Cartype extends Model {
  static associate(models) {
    this.hasMany(models.Car);
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

      { sequelize, tableName: 'carstypes', timestamps: false },
    );
    return this;
  }
}
