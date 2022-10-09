import Sequelize, { Model } from 'sequelize';

export default class PropertySipac extends Model {
  static associate(models) {
    this.hasMany(models.BuildingSipac, { as: 'buildingsSipac', sourceKey: 'id', foreignKey: 'propertySipacId' });
  }

  static init(sequelize) {
    super.init({

      id: {
        type: Sequelize.INTEGER,
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
      rip: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nomeImovel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipoImovel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipoVocacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      formaAquisicao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      campusResponsavel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      areaTerreno: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      valorTerreno: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      qtdAreaConstruida: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      qtdAreaConstruida_util: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      valorImovel: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },

    }, { sequelize, tableName: 'properties_sipac', timestamps: false });
    return this;
  }
}
