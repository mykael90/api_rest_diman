module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('materials_intypes', [
      {
        id: 1,
        type: 'RM AUTO',
      },
      {
        id: 2,
        type: 'RM MANUAL',
      },
      {
        id: 3,
        type: 'RETORNO',
      },
      {
        id: 4,
        type: 'FORNECEDOR',
      },
      {
        id: 5,
        type: 'DOACAO',
      },
      {
        id: 6,
        type: 'INFRA',
      },
      {
        id: 7,
        type: 'TRANSFORME',
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
