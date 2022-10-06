import Sequelize, { Model } from 'sequelize';

export default class WorkerJobtype extends Model {
  static associate(models) {
    console.log(models);
    this.belongsToMany(models.Worker, {
      through: models.WorkerContract,
    });
    // this.hasMany(models.ContractValidyItem);
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
