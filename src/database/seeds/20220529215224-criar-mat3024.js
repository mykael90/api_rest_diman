module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materials', [
      {
        'id': '2325205',
        'id_sipac': '3024000000023',
        'id_catmat': '358823',
        'unity': 'UNIDADE',
        'group_sipac': '3024',
        'desc': 'ABRAÇADEIRA REGULÁVEL - 1/2" A 3/4"',
        'desc_detailed': 'Abraçadeira regulável rosca sem fim 13 X 19mm, aproximadamente 13 a 19mm; recomendadas para uso em mangueiras de material semirrígido ou fixação de elementos (placas, antenas, luminosos e outros) devido à sua grande capacidade de aperto e dimensões reduzidas; aço; parafuso de 8mm com fenda; largura mínima da fita 9mm; Diâmetro mínimo ideal para uso: 13 milímetros; diâmetro máximo: 19 milímetros (diâmetro mínimo: 1/2 polegadas e diâmetro máximo: 3/4 polegadas). CATMAT: 358823',
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
