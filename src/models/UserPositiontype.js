import Sequelize, { Model } from 'sequelize';

export default class UserPositiontype extends Model {
  static associate(models) {
    this.belongsToMany(models.User, { through: models.UserPosition });
    this.hasMany(models.UserPosition);
  }

  static init(sequelize) {
    super.init(
      {

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

        position: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 30],
              msg: 'Cargo deve ter entre 3 e 30 caracteres',
            },
          },
        },

        level: {
          type: Sequelize.STRING,
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio',
            },
          },
        },

      },

      { sequelize, tableName: 'users_positiontypes', timestamps: false },
    );
    return this;
  }
}
