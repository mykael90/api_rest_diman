import Sequelize, { Model } from 'sequelize';

export default class UserThirdtype extends Model {
  static associate(models) {
    this.belongsToMany(models.User, { through: models.UserThird });
    this.hasMany(models.UserThird);
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

        job: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 30],
              msg: 'Cargo deve ter entre 3 e 30 caracteres',
            },
          },
        },

      },

    }, { sequelize, tableName: 'users_thirdtypes', timestamps: false });
    return this;
  }
}
