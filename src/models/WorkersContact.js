import Sequelize, { Model } from 'sequelize';

export default class MaterialInItem extends Model {
  static associate(models) {
    this.belongsTo(models.Workers);
    this.belongsTo(models.ContactTypes);
  }

  static init(sequelize) {
    super.init(
      {
        contact: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },

        default: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        obs: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'workers_contact',
        timestamps: false,
      }
    );
    return this;
  }
}
