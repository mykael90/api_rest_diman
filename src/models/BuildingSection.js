import Sequelize, { Model } from 'sequelize';

export default class BuildingSection extends Model {
  static associate(models) {
    this.belongsTo(models.BuildingSipac, {
      sourceKey: 'subRip',
      foreignKey: 'BuildingSipacSubRip',
    });
    this.belongsTo(models.BuildingSectiontype);
  }

  static init(sequelize) {
    super.init(
      {
        superId: {
          type: Sequelize.UUID,
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        inactive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        cod: {
          type: Sequelize.STRING(4),
          allowNull: true,
        },
        obs: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        position: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      { sequelize, tableName: 'buildings_sections', timestamps: false }
    );
    return this;
  }
}
