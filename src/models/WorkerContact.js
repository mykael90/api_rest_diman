import Sequelize, { Model } from 'sequelize';

export default class WorkerContact extends Model {
  static associate(models) {
    console.log(models);
    this.belongsTo(models.Worker);
    this.belongsTo(models.ContactType);
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
