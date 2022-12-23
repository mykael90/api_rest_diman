module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('properties_sipac', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      rip: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nome_imovel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_imovel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_vocacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      forma_aquisicao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      campus_responsavel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      area_terreno: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      valor_terreno: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      qtd_area_construida: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      qtd_area_construida_util: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      valor_imovel: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },

    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('properties_sipac');
  },
};
