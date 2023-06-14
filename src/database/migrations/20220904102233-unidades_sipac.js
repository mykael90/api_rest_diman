module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('unidades_sipac', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        primaryKey: true,
      },
      id_sipac: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nome_unidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sigla: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_unidade_gestora: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_unidade_responsavel: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      data_criacao: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      data_extincao: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      classificacao_unidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nivel_organizacional: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_unidade_organizacional: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      area_atuacao_unidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('unidades_sipac');
  },
};
