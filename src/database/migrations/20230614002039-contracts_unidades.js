module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts_unidades', {
      contract_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'contracts',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      unidade_sipac_id: {
        primaryKey: true,
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
          model: {
            tableName: 'unidades_sipac',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
