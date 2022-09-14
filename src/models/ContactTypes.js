import Sequelize, { Model } from 'sequelize';

export default class Workers extends Model {
  static associate(models) {
    this.belongsToMany(models.Workers, {
      through: models.WorkersContact,
    });
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
          type: Sequelize.STRING(15),
          allowNull: false,
        },
      },

      { sequelize, tableName: 'contacttypes', timestamps: false }
    );
  }
}
