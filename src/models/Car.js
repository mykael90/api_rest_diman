import Sequelize, { Model } from 'sequelize';

export default class Car extends Model {
  static associate(models) {
    this.belongsTo(models.Cartype);
    this.belongsTo(models.CarFueltype);
    this.hasMany(models.CarPhoto);
    this.hasMany(models.CarOccurrence);
    this.hasMany(models.CarInspection);
    this.hasMany(models.CarAccessory);
    this.hasMany(models.CarStatus);
  }

  static init(sequelize) {
    super.init(
      {
        brand: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        model: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        alias: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        color: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        plate: {
          type: Sequelize.STRING(7),
          allowNull: false,
          validate: {
            len: [7, 7],
          },
        },
        renavan: {
          type: Sequelize.INTEGER(12),
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER(9),
          allowNull: false,
        },
        chassi: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        payload: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        weight: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fuelVolume: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        peopleCapacity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        obs: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'cars' },
    );
    return this;
  }
}
