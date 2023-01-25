module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('materials_out_discardtypes', [
      {
        id: 1,
        type: 'VENCIDO',
      },
      {
        id: 2,
        type: 'FALHA FABRICAÇÃO',
      },
      {
        id: 3,
        type: 'FALHA TRANSPORTE',
      },
      {
        id: 4,
        type: 'QUEBRA MANUSEIO',
      },
    ], {});
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
