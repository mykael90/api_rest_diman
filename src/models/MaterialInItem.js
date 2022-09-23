/* eslint-disable max-len */
import Sequelize, { Model } from 'sequelize';

export default class MaterialInItem extends Model {
  static associate(models) {
    this.belongsTo(models.Material);
    this.belongsTo(models.MaterialIn);
  }

  static init(sequelize) {
    super.init({

      quantity: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },

      value: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },

    }, {
      sequelize, tableName: 'materials_in_items', timestamps: false,
    });

    this.addHook('afterCreate', async (item) => {
      const { freeInventory } = await sequelize.models.MaterialInventory.findByPk(item.MaterialId);
      await sequelize.models.MaterialInventory.update({ freeInventory: Number(freeInventory) + Number(item.quantity) }, {
        where: {
          materialId: item.MaterialId,
        },
      });
    });

    return this;
  }
}
