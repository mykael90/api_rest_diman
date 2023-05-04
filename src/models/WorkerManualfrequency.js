import Sequelize, { Model } from 'sequelize';

export default class WorkerManualfrequency extends Model {
  static associate(models) {
    this.belongsTo(models.Contract);
    this.belongsTo(models.Unidade, {
      targetKey: 'id',
      foreignKey: 'UnidadeId',
    });
    this.belongsToMany(models.WorkerManualfrequencytype, {
      through: models.WorkerManualfrequencyItem,
    });
    this.belongsToMany(models.Worker, {
      through: models.WorkerManualfrequencyItem,
    });
    this.belongsTo(models.User);
    this.hasMany(models.WorkerManualfrequencyItem);
  }

  static init(sequelize) {
    super.init(
      {
        date: {
          type: Sequelize.DATEONLY,
        },
        obs: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      { sequelize, tableName: 'workers_manualfrequencies', timestamps: false }
    );
    return this;
  }
}
