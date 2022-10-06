import Sequelize, { Model } from 'sequelize';

export default class Address extends Model {
  // static associate(models) {
  // }

  static init(sequelize) {
    super.init(
      {
        country: {
          type: Sequelize.STRING,
        },
        city: {
          type: Sequelize.STRING,
        },
        district: {
          type: Sequelize.STRING,
        },
        street: {
          type: Sequelize.STRING,
        },
        zipcode: {
          type: Sequelize.STRING(9),
        },
        number: {
          type: Sequelize.INTEGER,
        },
        complement: {
          type: Sequelize.STRING,
        },
      },

      { sequelize, tableName: 'addresses', timestamps: false }
    );
    return this;
  }
}
