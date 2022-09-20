import Sequelize, { Model } from 'sequelize';

export default class Worker extends Model {
  static associate(models) {
    this.belongsToMany(models.ContactType, {
      through: models.WorkerContact,
    });
    this.hasMany(models.WorkerContact);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 255],
              msg: 'Descrição deve ter entre 3 e 255 caracteres',
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        birthdate: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        filename_photo: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
      },

      { sequelize, tableName: 'workers' }
    );
    return this;
  }
}
