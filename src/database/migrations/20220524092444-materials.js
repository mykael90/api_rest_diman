module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('materials', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_sipac: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_catmat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      desc_detailed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      group_sipac: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename_photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Sequelize.NOW,
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
