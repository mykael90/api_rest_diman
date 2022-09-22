import Sequelize, { Model } from 'sequelize';

export default class Contacttype extends Model {
  static associate(models) {
    this.belongsToMany(models.Worker, {
      through: models.WorkerContact,
    });

    this.hasMany(models.WorkerContact);
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
    return this;
  }
}
