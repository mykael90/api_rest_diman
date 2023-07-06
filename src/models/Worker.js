import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Worker extends Model {
  static associate(models) {
    this.belongsToMany(models.Contacttype, {
      through: models.WorkerContact,
    });
    this.belongsToMany(models.Address, {
      through: models.WorkerAddress,
    });
    this.belongsToMany(models.Contract, {
      through: models.WorkerContract,
    });
    this.belongsToMany(models.WorkerJobtype, {
      through: models.WorkerContract,
    });
    this.hasMany(models.WorkerAddress);
    this.hasMany(models.WorkerContact);
    this.hasMany(models.WorkerContract);

    this.hasMany(models.MaterialOut);

    this.hasMany(models.MaterialReserve);
    this.hasMany(models.WorkerTaskItem);
    this.hasMany(models.WorkerManualfrequencyItem);
  }

  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 255],
              msg: 'Descrição deve ter entre 3 e 255 caracteres',
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        birthdate: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        filenamePhoto: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },

        urlPhoto: {
          type: Sequelize.VIRTUAL,
          get() {
            if (!this.getDataValue('filenamePhoto')) { return `${appConfig.url}/uploads/workers/images/default.png`; }
            return `${appConfig.url}/uploads/workers/images/${this.getDataValue(
              'filenamePhoto',
            )}`;
          },
        },

        rg: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },

      { sequelize, tableName: 'workers' },
    );
    return this;
  }
}
