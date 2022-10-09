import Sequelize, { Model } from 'sequelize';

export default class MaterialRelease extends Model {
  static associate(models) {
    this.belongsToMany(models.Material, { through: models.MaterialReleaseItem });
    this.belongsTo(models.User);
    this.belongsTo(models.MaterialIn);

    this.hasMany(models.MaterialReleaseItem);
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
      sequelize, tableName: 'materials_release',
    });
    return this;
  }
}
