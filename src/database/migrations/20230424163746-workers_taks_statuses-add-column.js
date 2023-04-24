module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'workers_tasks_statuses', // table name
        'date', // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'workers_tasks_statuses', // table name
        'description', // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
    ]);
  },

  down() {},
};
