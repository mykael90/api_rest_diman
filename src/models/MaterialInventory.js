import Sequelize, { Model } from 'sequelize';

export default class MaterialInventory extends Model {
  static associate(models) {
    this.belongsTo(models.Material);
  }

  static init(sequelize) {
    super.init({
      materialId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },

      initialQuantity: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },

      freeInventory: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0,
      },
      restrictInventory: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0,
      },

    }, {
      sequelize, tableName: 'materials_inventory', timestamps: false,
    });
    return this;
  }
}
