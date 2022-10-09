import Sequelize, { Model } from 'sequelize';

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
          allowNull: false,
        },

        filename_photo: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        rg: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },

      { sequelize, tableName: 'workers' }
    );
    return this;
  }
}
