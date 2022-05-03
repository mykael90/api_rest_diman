import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({

      nome: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome deve ter entre 3 e 255 caracteres',
          },
        },
      },

      sobrenome: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O email cadastrado já existe',
        },
      },

      idade: {
        type: Sequelize.INTEGER,
      },

      peso: {
        type: Sequelize.FLOAT,
      },

      altura: {
        type: Sequelize.FLOAT,
      },

    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}
