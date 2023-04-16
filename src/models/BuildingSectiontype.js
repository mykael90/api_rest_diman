import Sequelize, { Model } from 'sequelize';

export default class BuildingSectiontype extends Model {
  static associate(models) {
    this.hasMany(models.BuildingSection);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'buildings_sectionstypes',
        timestamps: false,
      }
    );
    return this;
  }
}
