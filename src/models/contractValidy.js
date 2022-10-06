import Sequelize, { Model } from 'sequelize';

export default class ContractValidy extends Model {
  static associate(models) {
    // this.belongsTo(models.ContractValidyItems);
  }

  static init(sequelize) {
    super.init(
      {
        contractValidytype: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        end: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        value: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
      },

      { sequelize, tableName: 'contracts_validy', timestamps: false }
    );
    return this;
  }
}
