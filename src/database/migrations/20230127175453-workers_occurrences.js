module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('workers_occurrences', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      worker_occurrencetype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workers_occurrencestypes',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      date_start: {
        type: Sequelize.DATEONLY,
      },
      date_end: {
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
      description: {
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
