/* eslint-disable max-len */
import Sequelize, { Model } from 'sequelize';

export default class MaterialInFile extends Model {
  static associate(models) {
    this.belongsTo(models.MaterialIn);
  }

  static init(sequelize) {
    super.init({

      filename: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      originalName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    }, {
      sequelize, tableName: 'materials_in_files', timestamps: false,
    });

    return this;
  }
}
