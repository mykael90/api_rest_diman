import Sequelize, { Model } from 'sequelize';

export default class ContractValidy extends Model {
  static associate(models) {
    this.belongsTo(models.ContractValidyItem);
  }

  static init(sequelize) {
    super.init(
      {
        contractValidytypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        end: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        value: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
      },

      { sequelize, tableName: 'contracts_validy', timestamps: false },
    );
    return this;
  }
}
