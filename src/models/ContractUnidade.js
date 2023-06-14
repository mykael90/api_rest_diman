import Sequelize, { Model } from 'sequelize';

export default class ContractUnidade extends Model {
  static associate(models) {
    this.belongsTo(models.Contract, {
      // targetKey: 'id',
      foreignKey: {
        name: 'contract_id',
        primaryKey: true,
      },
    });
    this.belongsTo(models.Unidade, {
      // targetKey: 'id',
      foreignKey: { name: 'unidade_sipac_id', primaryKey: true },
    });
  }

  static init(sequelize) {
    super.init(
      {
        contract_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'contracts',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        },
        unidade_sipac_id: {
          primaryKey: true,
          type: Sequelize.BIGINT(20),
          allowNull: false,
          references: {
            model: {
              tableName: 'unidades_sipac',
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        },
      },

      { sequelize, tableName: 'contracts_unidades', timestamps: false }
    );
    return this;
  }
}
