import Sequelize, { Model } from 'sequelize';

export default class WorkerTasktype extends Model {
  static associate(models) {
    // Define model associations
  }

  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(45),
          allowNull: false,
          comment: 'ATENDIMENTO ELÉTRICA; ATENDIMENTO CIVIL; ETC',
        },
      },
      {
        sequelize,
        tableName: 'workers_taskstypes',
        timestamps: false,
      }
    );
  }
}
