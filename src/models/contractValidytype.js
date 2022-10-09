import Sequelize, { Model } from 'sequelize';

export default class ContractValidytype extends Model {
  static associate(models) {
    this.hasMany(models.ContractValidy);
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },

      { sequelize, tableName: 'contracts_validytype', timestamps: false },
    );
    return this;
  }
}
