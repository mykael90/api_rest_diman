module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'workers_contracts', // table name
        'unidade_id', // new field name
        {
          type: Sequelize.BIGINT(20),
          allowNull: true,
          references: {
            model: 'unidades_sipac',
            key: 'id',
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT',
        },
      ),
      queryInterface.addColumn(
        'workers_contracts', // table name
        'obs', // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
