module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_in', // table name
        'value', // new field name
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'materials_in', // table name
        'required_by', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'materials_in', // table name
        'req_maintenance', // new field name
        {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'materials_in', // table name
        'req_unit', // new field name
        {
          type: Sequelize.BIGINT(20),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'materials_in', // table name
        'cost_unit', // new field name
        {
          type: Sequelize.BIGINT(20),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'materials_in', // table name
        'register_date', // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
