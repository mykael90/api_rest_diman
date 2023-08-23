/* eslint-disable max-len */
import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class CarPhoto extends Model {
  static associate(models) {
    this.belongsTo(models.Car);
  }

  static init(sequelize) {
    super.init({

      originalName: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Não pode estar vazío',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Não pode estar vazío',
          },
        },
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      src: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/uploads/cars/images/${this.getDataValue('filename')}`;
        },
      },

    }, {
      sequelize, tableName: 'cars_photos', timestamps: false,
    });

    return this;
  }
}
