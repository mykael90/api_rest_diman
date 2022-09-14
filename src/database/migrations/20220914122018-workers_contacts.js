module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('workers_contact', {
      worker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      contacttypes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contacttypes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      contact: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      default: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      obs: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
