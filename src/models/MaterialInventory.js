import Sequelize, { Model, DECIMAL } from 'sequelize';

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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },

      initialValue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      updatedValue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      releaseInventory: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      restrictInventory: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      reserveInventory: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      freeInventory: {
        type: Sequelize.VIRTUAL,
        get() {
          return (Number(this.initialQuantity)
          + Number(this.releaseInventory)).toFixed(2);
        },
        set(value) {
          throw new Error('Do not try to set the `total` value!');
        },
      },
      totalInventory: {
        type: Sequelize.VIRTUAL,
        get() {
          return (Number(this.initialQuantity)
          + Number(this.releaseInventory)
          + Number(this.reserveInventory)
          + Number(this.restrictInventory)).toFixed(2);
        },
        set(value) {
          throw new Error('Do not try to set the `total` value!');
        },
      },

    }, {
      sequelize, tableName: 'materials_inventory', timestamps: false,
    });
    return this;
  }
}
