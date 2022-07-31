module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users_roles', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users_roletypes',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users_roles');
  },
};
