/* eslint-disable max-len */
import Sequelize, { Model } from 'sequelize';

export default class MaterialIn extends Model {
  static associate(models) {
    this.belongsToMany(models.Material, { through: models.MaterialInItem });
    this.belongsTo(models.MaterialIntype);
    this.belongsTo(models.User);
    this.belongsTo(models.Unidade, { targetKey: 'id', foreignKey: 'cost_unit' });

    this.hasMany(models.MaterialInItem);
    this.hasMany(models.MaterialRestrict);
    this.hasMany(models.MaterialRelease);

    this.belongsTo(models.MaterialOut, { as: 'MaterialReturned', sourceKey: 'id', foreignKey: 'returnId' });
  }

  static init(sequelize) {
    super.init({

      materialIntypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      req: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [6, 10],
            msg: 'A requisição de material deve ter entre 6 e 10 caracteres',
          },
        },
      },

      value: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },

      requiredBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      reqMaintenance: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [6, 10],
            msg: 'A requisição de manutenção deve ter entre 6 e 10 caracteres',
          },
        },
      },

      reqUnit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      costUnit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      invoice: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      registerDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      obs: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      returnId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

    }, {
      sequelize, tableName: 'materials_in',
    });

    // RESTRINGIR TODOS OS MATERIAIS DA REQUISIÇÃO DE ENTRADA DE 'SIPAC' E 'RETORNO' LOGO APÓS RECEBIMENTO
    this.addHook('afterCreate', async (item) => {
      if (Number(item.materialIntypeId) <= 3) {
        await sequelize.models.MaterialRestrict.create(
          {
            materialInId: item.id,
            userId: item.userId,
            MaterialRestrictItems: item.MaterialInItems,
          },
          {
            include: [sequelize.models.MaterialRestrictItem],
          },
        );
      }
    });
    return this;
  }
}
