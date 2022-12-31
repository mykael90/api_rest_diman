/* eslint-disable max-len */
import Sequelize, { Model } from 'sequelize';

export default class MaterialOutFile extends Model {
  static associate(models) {
    this.belongsTo(models.MaterialOut);
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
      sequelize, tableName: 'materials_out_files', timestamps: false,
    });

    return this;
  }
}
