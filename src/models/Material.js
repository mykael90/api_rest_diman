import Sequelize, { Model } from 'sequelize';

export default class Material extends Model {
  static associate(models) {
    this.belongsToMany(models.MaterialIn, { through: models.MaterialInItem });
    this.belongsToMany(models.MaterialOut, { through: models.MaterialOutItem });
    this.belongsToMany(models.MaterialRestrict, { through: models.MaterialRestrictItem });
    this.belongsToMany(models.MaterialRelease, { through: models.MaterialReleaseItem });
    this.belongsToMany(models.MaterialReserve, { through: models.MaterialReserveItem });

    this.hasMany(models.MaterialInItem);
    this.hasMany(models.MaterialOutItem);

    this.hasOne(models.MaterialInventory, { sourceKey: 'id', foreignKey: 'material_id' });
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        idSipac: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        idCatmat: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 255],
              msg: 'Descrição deve ter entre 3 e 255 caracteres',
            },
          },
        },

        specification: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        unit: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        groupSipac: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        filenamePhoto: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        isInactive: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true,
        },

      },

      { sequelize, tableName: 'materials' },
    );
    this.addHook('afterCreate', async (material) => {
      const { id: materialId } = material;
      await sequelize.models.MaterialInventory.create({ materialId });
    });
    return this;
  }
}
