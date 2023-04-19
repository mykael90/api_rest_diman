import Sequelize, { Model } from 'sequelize';

export default class WorkerTask extends Model {
  static associate(models) {
    this.belongsTo(models.WorkerTasktype);
    this.hasOne(models.BuildingSipac, {
      sourceKey: 'buildingSipacSubRip',
      foreignKey: 'subRip',
    });
    this.hasOne(models.PropertySipac, {
      sourceKey: 'propertySipacId',
      foreignKey: 'id',
    });
    this.hasMany(models.WorkerTaskServant);
    this.hasMany(models.WorkerTaskItem);
    // this.belongsTo(models.PropertySipac);
    // this.belongsTo(models.BuildingSipac);
    this.hasMany(models.WorkerTaskRisk);
    this.hasMany(models.WorkerTaskStatus);
    this.belongsToMany(models.WorkerTaskRisktype, {
      through: models.WorkerTaskRisk,
    });
    this.belongsToMany(models.WorkerTaskStatustype, {
      through: models.WorkerTaskStatus,
    });
    this.belongsToMany(models.Worker, { through: models.WorkerTaskItem });
    this.belongsToMany(models.User, { through: models.WorkerTaskServant });
  }

  static init(sequelize) {
    super.init(
      {
        reqMaintenance: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        start: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        end: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        place: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        propertySipacId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        buildingSipacId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        buildingSipacSubRip: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        extraActivity: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          comment: 'atividade extra',
        },
      },
      { sequelize, tableName: 'workers_tasks', timestamps: false },
    );
    return this;
  }
}
