/* eslint-disable max-len */
import Sequelize, { Model } from 'sequelize';

export default class MaterialRestrictItem extends Model {
  static associate(models) {
    this.belongsTo(models.Material);
    this.belongsTo(models.MaterialRestrict);
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
      sequelize, tableName: 'materials_restrict_items', timestamps: false,
    });

    // ATUALIZAR SALDO DE MATERIAL `LIVRE`E `RESTRITO`
    this.addHook('afterCreate', async (item) => {
      const { releaseInventory, restrictInventory } = await sequelize.models.MaterialInventory.findByPk(item.MaterialId);
      await sequelize.models.MaterialInventory.update({ releaseInventory: Number(releaseInventory) - Number(item.quantity), restrictInventory: Number(restrictInventory) + Number(item.quantity) }, {
        where: {
          materialId: item.MaterialId,
        },
      });
    });

    return this;
  }
}
