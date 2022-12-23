import Sequelize, { Model } from 'sequelize';

export default class UserPosition extends Model {
  static associate(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.UserPositiontype);
  }

  static init(sequelize) {
    super.init({

      matSiape: {
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
      sequelize, tableName: 'users_positions', timestamps: false,
    });
    return this;
  }
}
