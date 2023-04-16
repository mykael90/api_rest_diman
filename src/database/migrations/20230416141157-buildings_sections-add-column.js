module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'buildings_sections', // table name
        'cod', // new field name
        {
          type: Sequelize.STRING(4),
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'buildings_sections', // table name
        'obs', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'buildings_sections', // table name
        'inactive', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        }
      ),
    ]);
  },

  down() {},
};
