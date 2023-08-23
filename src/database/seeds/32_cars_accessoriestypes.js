module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('cars_accessoriestypes', [
      {
        id: 1,
        type: 'CARROCERIA',
      },
      {
        id: 2,
        type: 'CAÇAMBA',
      },
      {
        id: 3,
        type: 'CESTO AÉREO',
      },
      {
        id: 4,
        type: 'MUNK',
      },
      {
        id: 5,
        type: 'PÁ CARREGADEIRA',
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
