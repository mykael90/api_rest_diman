import Sequelize, { Model } from 'sequelize';

export default class MaterialIntype extends Model {
  static associate(models) {
    this.hasMany(models.MaterialIn);
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

      type: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [3, 30],
            msg: 'Cargo deve ter entre 3 e 30 caracteres',
          },
        },
      },

    }, { sequelize, tableName: 'materials_intypes', timestamps: false });
    return this;
  }
}
