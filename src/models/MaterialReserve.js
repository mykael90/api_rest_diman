import Sequelize, { Model } from 'sequelize';

export default class MaterialReserve extends Model {
  static associate(models) {
    this.belongsToMany(models.Material, { through: models.MaterialReserveItem });
    this.belongsTo(models.User);
    this.hasMany(models.MaterialReserveItem);
  }

  static init(sequelize) {
    super.init({

      reqMaintenance: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 10],
            msg: 'A requisição de manutenção deve ter entre 6 e 10 caracteres',
          },
        },
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
      separatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      withdrawnAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      canceledAt: {
        type: Sequelize.DATE,
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

    }, {
      sequelize, tableName: 'materials_reserve', updatedAt: false,
    });
    return this;
  }
}
