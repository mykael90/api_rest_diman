import Sequelize, { Model } from 'sequelize';

export default class Provider extends Model {
  static associate(models) {
    this.hasMany(models.Contract);
  }

  static init(sequelize) {
    super.init(
      {
        cpfCnpj: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },

        razaoSocial: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        nomeFantasia: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },

      { sequelize, tableName: 'providers', timestamps: false },
    );
    return this;
  }
}
