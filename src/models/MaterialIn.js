import Sequelize, { Model } from 'sequelize';

export default class MaterialIn extends Model {
  static associate(models) {
    this.belongsToMany(models.Material, { through: models.MaterialInItem });
    this.belongsTo(models.MaterialIntype);
    this.belongsTo(models.User);
    this.belongsTo(models.Unidade, { targetKey: 'id', foreignKey: 'cost_unit' });

    this.hasMany(models.MaterialInItem);
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

      registerDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

    }, {
      sequelize, tableName: 'materials_in',
    });
    return this;
  }
}
