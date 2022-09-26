import Sequelize, { Model } from 'sequelize';

export default class WorkersJobtypes extends Model {
  static associate(models) {
    this.belongsToMany(models.Worker, {
      through: models.WorkerContract,
    });

    this.hasMany(models.WorkerContract);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        job: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },

      { sequelize, tableName: 'workers_jobtypes', timestamps: false }
    );
    return this;
  }
}
