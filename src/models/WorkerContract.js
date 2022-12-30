import Sequelize, { Model } from 'sequelize';

export default class WorkerContract extends Model {
  static associate(models) {
    this.belongsTo(models.Worker);
    this.belongsTo(models.Contract);
    this.belongsTo(models.WorkerJobtype);
    this.belongsTo(models.Unidade, { sourceKey: 'id', foreignKey: 'unidadeId' });
  }

  static init(sequelize) {
    super.init(
      {
        // workerId: {
        //   type: Sequelize.INTEGER,
        //   primaryKey: true,
        //   allowNull: false,
        // },
        // // verificar pq foi necessario colocar isso aqui
        // contractId: {
        //   type: Sequelize.INTEGER,
        //   primaryKey: true,
        //   allowNull: false,
        // },
        // // verificar pq foi necessario colocar isso aqui
        // workerJobtypeId: {
        //   type: Sequelize.INTEGER,
        //   primaryKey: true,
        //   allowNull: false,
        // },
        start: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        end: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        located: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        unidadeId: {
          type: Sequelize.BIGINT(20),
          allowNull: true,
        },
        obs: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'workers_contracts', timestamps: false },
    );
    return this;
  }
}
