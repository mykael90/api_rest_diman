import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static associate(models) {
    this.belongsToMany(models.UserPositiontype, { through: models.UserPosition });
    this.belongsToMany(models.UserThirdtype, { through: models.UserThird });
    this.belongsToMany(models.UserRoletype, { through: models.UserRole });
    this.hasMany(models.UserPosition);
    this.hasMany(models.UserThird);
    this.hasMany(models.UserRole);
    this.hasOne(models.UserPersonal, { foreignKey: 'user_id' });
    this.hasOne(models.UserPhoto, { foreignKey: 'user_id' });

    this.hasMany(models.MaterialIn);
    this.hasMany(models.MaterialOut);
    this.hasMany(models.MaterialOut, { as: 'authorizer', sourceKey: 'id', foreignKey: 'authorizedBy' });
    this.hasMany(models.MaterialRestrict);
    this.hasMany(models.MaterialRelease);
    this.hasMany(models.MaterialReserve);
    this.hasMany(models.WorkerTaskServant);
  }

  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 35],
            msg: 'Login deve ter entre 3 e 35 caracteres',
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O email cadastrado já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },

      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres',
          },
        },
      },

    }, { sequelize });

    this.addHook('beforeSave', async (user) => {
      if (user.password) { user.password_hash = await bcryptjs.hash(user.password, 8); }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
