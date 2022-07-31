import Sequelize, { Model } from 'sequelize';

export default class UserPosition extends Model {
  static init(sequelize) {
    super.init({

      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: sequelize.models.User,
          key: 'id',
        },
      },
      userPositiontypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: sequelize.models.UserPositiontypeId,
          key: 'id',
        },
      },

      matSiape: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [1, 10],
            msg: 'Matrícula deve ter entre 1 e 10 caracteres',
          },
        },
      },

    }, { sequelize, tableName: 'users_positions', timestamps: false });
    return this;
  }
}
