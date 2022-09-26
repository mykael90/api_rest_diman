import Sequelize, { Model } from 'sequelize';

export default class MaterialRestrict extends Model {
  static associate(models) {
    this.belongsToMany(models.Material, { through: models.MaterialRestrictItem });
    this.belongsTo(models.User);

    this.hasMany(models.MaterialRestrictItem);
  }

  static init(sequelize) {
    super.init({

      materialInId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      requiredBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },

    }, {
      sequelize, tableName: 'materials_restrict',
    });
    return this;
  }
}
