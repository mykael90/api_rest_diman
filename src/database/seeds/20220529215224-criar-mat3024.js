module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materials', [
      {
        'id_sipac': '2325205',
        'id': '3024000000023',
        'id_catmat': '358823',
        'unit': 'UNIDADE',
        'group_sipac': '3024',
        'name': 'ABRAÇADEIRA REGULÁVEL - 1/2" A 3/4"',
        'specification': 'Abraçadeira regulável rosca sem fim 13 X 19mm, aproximadamente 13 a 19mm; recomendadas para uso em mangueiras de material semirrígido ou fixação de elementos (placas, antenas, luminosos e outros) devido à sua grande capacidade de aperto e dimensões reduzidas; aço; parafuso de 8mm com fenda; largura mínima da fita 9mm; Diâmetro mínimo ideal para uso: 13 milímetros; diâmetro máximo: 19 milímetros (diâmetro mínimo: 1/2 polegadas e diâmetro máximo: 3/4 polegadas). CATMAT: 358823',
      },
      {
        'id_sipac': '306294',
        'id': '302400014270',
        'id_catmat': '373688',
        'unit': 'UNIDADE',
        'group_sipac': '3024',
        'name': 'ABRAÇADEIRA REGULÁVEL - 3/4" A 1"',
        'specification': 'Abraçadeira rosca sem fim de aproximadamente 19a25mm; Recomendadas para uso em mangueiras de material semirrígido ou fixação de elementos (placas, antenas, luminosos e outros) devido à sua grande capacidade de aperto e dimensões reduzidas; em aço; parafuso com no mínimo 8mm com fenda; largura mínima da fita 9mm; diâmetro mínimo ideal para uso: 19 milímetros; diâmetro máximo: 25 milímetros (diâmetro mínimo: 3/4 polegadas e diâmetro máximo: 1 polegadas). CATMAT: 373688',
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
