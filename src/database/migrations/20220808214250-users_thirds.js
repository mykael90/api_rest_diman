module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users_thirds', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      user_thirdtype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users_thirdtypes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      contract: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users_thirds');
  },
};
