import Sequelize, { Model } from 'sequelize';

export default class WorkerManualfrequencytype extends Model {
  static associate(models) {
    this.belongsToMany(models.WorkerManualfrequency, {
      through: models.WorkerManualfrequencyItem,
    });
    this.hasMany(models.WorkerManualfrequencyItem);
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
      {
        sequelize,
        tableName: 'workers_manualfrequenciestypes',
        timestamps: false,
      }
    );
    return this;
  }
}
