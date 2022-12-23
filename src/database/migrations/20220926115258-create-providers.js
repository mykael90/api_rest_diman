module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('providers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cpf_cnpj: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      razao_social: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: false,
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
