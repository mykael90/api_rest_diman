module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('workers_manualfrequencies_items', {
      worker_manualfrequency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'workers_manualfrequencies',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      worker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'workers',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      hours: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
      },
      obs: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      worker_manualfrequencytype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workers_manualfrequenciestypes',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
    });
  },

  async down() {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
