module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('contracts_validy_items', {
      contract_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'contracts_validy',
          key: 'contract_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      start: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'contracts_validy',
          key: 'start',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      worker_jobtype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workers_jobtypes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
