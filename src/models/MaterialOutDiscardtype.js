import Sequelize, { Model } from 'sequelize';

export default class MaterialOutDiscardtype extends Model {
  static associate(models) {
    this.hasMany(models.MaterialOut);
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

      { sequelize, tableName: 'materials_out_discardtypes', timestamps: false },
    );
    return this;
  }
}
