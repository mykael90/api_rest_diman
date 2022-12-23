import Sequelize, { Model } from 'sequelize';

export default class UserPersonal extends Model {
  static init(sequelize) {
    super.init({

      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },

      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rg_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING(),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(),
        allowNull: false,
        defaultValue: 'BRASIL',
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complement: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      contact_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

    }, {
      sequelize,
      tableName: 'users_personals',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
