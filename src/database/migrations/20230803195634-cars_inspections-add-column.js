module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'cars_inspections', // table name
        'hourmeter', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'cars_inspections', // table name
        'worker_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'workers_contracts',
            key: 'worker_id',
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT',
        },
      ),
    ]);
  },

  down() {
  },
};
