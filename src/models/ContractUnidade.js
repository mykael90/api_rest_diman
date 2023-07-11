import Sequelize, { Model } from 'sequelize';

export default class ContractUnidade extends Model {
  static associate(models) {
    this.belongsTo(models.Contract, {

      targetKey: 'id',
      foreignKey: {
        name: 'ContractId',
        primaryKey: true,
      },
    });
    this.belongsTo(models.Unidade, {

      targetKey: 'id',
      foreignKey: { name: 'UnidadeSipacId', primaryKey: true },

    });
  }

  static init(sequelize) {
    super.init(
      {
        // contractId: {
        //   primaryKey: true,
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: {
        //       tableName: 'contracts',
        //     },
        //     key: 'id',
        //   },
        //   onUpdate: 'CASCADE',
        //   onDelete: 'NO ACTION',
        // },
        // unidadeSipacId: {
        //   primaryKey: true,
        //   type: Sequelize.BIGINT(20),
        //   allowNull: false,
        //   references: {
        //     model: {
        //       tableName: 'unidades_sipac',
        //     },
        //     key: 'id',
        //   },
        //   onUpdate: 'CASCADE',
        //   onDelete: 'NO ACTION',
        // },
      },

      { sequelize, tableName: 'contracts_unidades', timestamps: false },
    );
    return this;
  }
}
