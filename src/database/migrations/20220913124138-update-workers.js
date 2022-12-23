/* eslint-disable comma-dangle */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'workers', // table name
        'cpf', // new field name
        {
          type: Sequelize.STRING(14),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'workers', // table name
        'rg', // new field name
        {
          type: Sequelize.STRING(11),
          allowNull: true,
        }
      ),
    ]);
  },
};
