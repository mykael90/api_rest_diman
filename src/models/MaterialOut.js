import Sequelize, { Model } from 'sequelize';

export default class MaterialOut extends Model {
  static associate(models) {
    this.belongsToMany(models.Material, { through: models.MaterialOutItem });
    this.belongsTo(models.MaterialOuttype);
    this.belongsTo(models.User);
    this.belongsTo(models.User, { as: 'authorizer', sourceKey: 'id', foreignKey: 'authorizedBy' });
    this.belongsTo(models.Worker);
    this.hasMany(models.MaterialOutItem);

    this.hasMany(models.MaterialIn, { as: 'MaterialReturned', sourceKey: 'id', foreignKey: 'returnId' });
  }

  static init(sequelize) {
    super.init({

      materialOuttypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      reqMaterial: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      authorizedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      workerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      campusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      buildingId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      place: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      obs: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      materialReserveId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      userReplacementId:
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

    }, {
      sequelize, tableName: 'materials_out',
    });

    return this;
  }
}
