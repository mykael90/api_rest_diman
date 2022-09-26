import Sequelize, { Model } from 'sequelize';

export default class Provider extends Model {
  static associate(models) {
    console.log(models);
    this.hasMany(models.Contract);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cpf_cnpj: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },

        razao_social: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        nome_fantasia: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },

      { sequelize, tableName: 'providers', timestamps: false }
    );
    return this;
  }
}
