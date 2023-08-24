module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('cars_occurrencestypes', [
      {
        id: 1,
        type: 'ACIDENTE',
      },
      {
        id: 2,
        type: 'MULTA',
      },
      {
        id: 3,
        type: 'COLISÃO',
      },
      {
        id: 4,
        type: 'DEFEITO',
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
