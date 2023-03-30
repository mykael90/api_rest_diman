module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'buildings_sipac', // table name
        'zone', // new field name
        {
          type: Sequelize.STRING(1),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'buildings_sipac', // table name
        'num_infra', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'buildings_sipac', // table name
        'area', // new field name
        {
          type: Sequelize.DECIMAL(8, 2),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'buildings_sipac', // table name
        'floors', // new field name
        {
          type: Sequelize.INTEGER(2),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'buildings_sipac', // table name
        'inaugurated_at', // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
        }
      ),
    ]);
  },

  down() {},
};
