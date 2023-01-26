module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('workers_manualfrequencies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      contract_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contracts',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      unidade_id:
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
      date: {
        type: Sequelize.DATEONLY,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      obs: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      filename_document: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
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
