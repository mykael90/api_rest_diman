import Sequelize, { Model } from 'sequelize';

export default class UserThird extends Model {
  static associate(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.UserThirdtype);
  }

  static init(sequelize) {
    super.init({

      contract: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [1, 10],
            msg: 'Matrícula deve ter entre 1 e 10 caracteres',
          },
        },
      },

      start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      end: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

    }, {
      sequelize, tableName: 'users_thirds', timestamps: false,
    });
    return this;
  }
}
