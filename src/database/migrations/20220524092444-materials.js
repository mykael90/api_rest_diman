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
      detailed_desc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename_photo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
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
