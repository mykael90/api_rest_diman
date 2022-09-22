module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('materials_intypes', [
      {
        id: 1,
        type: 'SIPAC',
      },
      {
        id: 2,
        type: 'FORNECEDOR',
      },
      {
        id: 3,
        type: 'RETORNO',
      },
      {
        id: 4,
        type: 'DOACAO',
      },
      {
        id: 5,
        type: 'INICIAL',
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
