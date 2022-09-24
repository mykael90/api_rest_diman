module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('materials_reserve', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      req_maintenance:
      {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      authorized_by:
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      worker_id:
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      campus_id:
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      property_id:
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      building_id:
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Sequelize.NOW,
      },
      separated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      withdrawn_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      obs: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      place: {
        type: Sequelize.STRING,
        allowNull: true,
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
