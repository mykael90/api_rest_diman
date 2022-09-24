module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('materials_outtypes', [
      {
        id: 1,
        type: 'USO',
      },
      {
        id: 2,
        type: 'DESCARTE',
      },
      {
        id: 3,
        type: 'DEVOLUCAO',
      },
      {
        id: 4,
        type: 'DOACAO',
      },
      {
        id: 5,
        type: 'EXTRAVIO',
      },
      {
        id: 6,
        type: 'EMPRESTIMO',
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
