import Sequelize, { Model } from 'sequelize';

export default class Unidade extends Model {
  static associate(models) {
    this.hasMany(models.MaterialIn, {
      sourceKey: 'id',
      foreignKey: 'cost_unit',
    });
    this.hasMany(models.WorkerContract, {
      sourceKey: 'id',
      foreignKey: 'unidadeId',
    });
    this.hasMany(models.ContractUnidade, {
      targetKey: 'id',
      foreignKey: { name: 'UnidadeSipacId', primaryKey: true },
    });

    this.belongsToMany(models.Contract, { through: models.ContractUnidade, otherKey: 'ContractId' });
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.BIGINT(20),
          primaryKey: true,
          unique: {
            msg: 'O ID cadastrado já existe',
          },
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio',
            },
          },
        },
        idSipac: {
          type: Sequelize.INTEGER,
          unique: {
            msg: 'O ID_SIPAC cadastrado já existe',
          },
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio',
            },
          },
        },
        nomeUnidade: {
          type: Sequelize.STRING,
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio',
            },
          },
        },
        sigla: {
          type: Sequelize.STRING,
        },
        municipio: {
          type: Sequelize.STRING,
        },
        idUnidadeGestora: {
          type: Sequelize.INTEGER,
        },
        idUnidadeResponsavel: {
          type: Sequelize.INTEGER,
        },
        dataCriacao: {
          type: Sequelize.DATEONLY,
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio',
            },
          },
        },
        dataExtincao: {
          type: Sequelize.DATEONLY,
        },
        classificacaoUnidade: {
          type: Sequelize.STRING,
        },
        nivelOrganizacional: {
          type: Sequelize.STRING,
        },
        tipoUnidadeOrganizacional: {
          type: Sequelize.STRING,
        },
        areaAtuacaoUnidade: {
          type: Sequelize.STRING,
        },
      },
      { sequelize, tableName: 'unidades_sipac', timestamps: false },
    );
    return this;
  }
}
