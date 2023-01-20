module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('materials_outtypes', [
      {
        id: 1,
        type: 'USO',
      },
      {
        id: 2,
        type: 'BENEFICIAMENTO',
      },
      {
        id: 3,
        type: 'DEVOLUCAO',
      },
      {
        id: 4,
        type: 'EMPRESTIMO',
      },
      {
        id: 5,
        type: 'DESCARTE',
      },
      {
        id: 6,
        type: 'INFRA',
      },
      {
        id: 7,
        type: 'DOACAO',
      },
      {
        id: 8,
        type: 'EXTRAVIO',
      },
      {
        id: 9,
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
