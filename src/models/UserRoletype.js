import Sequelize, { Model } from 'sequelize';

export default class UserRoletype extends Model {
  static associate(models) {
    this.belongsToMany(models.User, { through: models.UserRole });
    this.hasMany(models.UserRole);
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

        role: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 30],
              msg: 'Papel deve ter entre 3 e 30 caracteres',
            },
          },
        },

        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },

      },

    }, { sequelize, tableName: 'users_roletypes', timestamps: true });
    return this;
  }
}
