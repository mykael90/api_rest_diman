import Sequelize, { Model } from 'sequelize';

export default class UserRole extends Model {
  static associate(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.UserRoletype);
  }

  static init(sequelize) {
    super.init({

    }, {
      sequelize, tableName: 'users_roles', timestamps: false,
    });
    return this;
  }
}
