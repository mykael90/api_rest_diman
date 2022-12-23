import Sequelize, { Model } from 'sequelize';

export default class UserPosition extends Model {
  static init(sequelize) {
    super.init({

      userId: { // foreign key
        type: Sequelize.INTEGER,
        references: 'users', // table name
        referencesKey: 'id', // th PK column for referenced table
      },
      userPositiontypeId: { // foreign key
        type: Sequelize.INTEGER,
        references: 'users_positiontypes', // table name
        referencesKey: 'id', // th PK column for referenced table
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
