import Sequelize, { Model } from 'sequelize';

export default class Material extends Model {
  static associate(models) {
    this.belongsToMany(models.MaterialIn, { through: models.MaterialInItem });

    this.hasMany(models.MaterialInItem);
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
  }
}
