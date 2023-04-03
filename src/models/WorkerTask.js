import Sequelize, { Model } from 'sequelize';

export default class WorkerTask extends Model {
  static associate(models) {
    this.belongsTo(models.WorkersTaskType, {
      foreignKey: 'worker_tasktype_id',
    });
    this.hasMany(models.WorkerTaskServant, { foreignKey: 'worker_task_id' });
    this.belongsTo(models.PropertySipac, { foreignKey: 'property_sipac_id' });
    this.belongsTo(models.BuildingSipac, { foreignKey: 'building_sipac_id' });
    this.hasMany(models.WorkersTasksRisk, {
      foreignKey: 'worker_task_id',
    });
    this.hasOne(models.WorkersTasksStatus, {
      foreignKey: 'worker_task_id',
    });
  }

  static init(sequelize) {
    super.init(
      {
        reqMaitenance: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
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
          allowNull: false,
        },
        propertySipacId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        buildingSipacId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        extraActivity: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          comment: 'atividade extra',
        },
      },
      { sequelize, tableName: 'workers_tasks', timestamps: false }
    );
    return this;
  }
}
