module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('contracts_validy', {
      start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },
      contract_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'contracts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      contract_validytype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contracts_validytype',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      end: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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
