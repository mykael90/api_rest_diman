import Sequelize, { Model } from 'sequelize';

export default class Unidade extends Model {
  static associate(models) {
    this.hasMany(models.MaterialIn, { sourceKey: 'id', foreignKey: 'cost_unit' });
  }

  static init(sequelize) {
    super.init({

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
      id_sipac: {
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
      nome_unidade: {
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
      id_unidade_gestora: {
        type: Sequelize.INTEGER,

      },
      id_unidade_responsavel: {
        type: Sequelize.INTEGER,

      },
      data_criacao: {
        type: Sequelize.DATEONLY,
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
      data_extincao: {
        type: Sequelize.DATEONLY,

      },
      classificacao_unidade: {
        type: Sequelize.STRING,

      },
      nivel_organizacional: {
        type: Sequelize.STRING,

      },
      tipo_unidade_organizacional: {
        type: Sequelize.STRING,

      },
      area_atuacao_unidade: {
        type: Sequelize.STRING,

      },

    }, { sequelize, tableName: 'unidades_sipac', timestamps: false });
    return this;
  }
}
