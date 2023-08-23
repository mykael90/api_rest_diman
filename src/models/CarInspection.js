import Sequelize, { Model } from 'sequelize';

export default class CarInspection extends Model {
  static associate(models) {
    this.belongsTo(models.Car);
    this.belongsTo(models.User);
    this.belongsTo(models.Worker);
    this.hasMany(models.CarInspectionPhoto);
  }

  static init(sequelize) {
    super.init(
      {
        // carId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        // },
        // userId: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        // },
        milage: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        internal: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        external: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        hourmeter: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        obs: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'cars_inspections' },
    );
    return this;
  }
}
