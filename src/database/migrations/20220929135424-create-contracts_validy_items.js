module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('contracts_validy_items', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
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
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'contracts_validy',
          key: 'start',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
