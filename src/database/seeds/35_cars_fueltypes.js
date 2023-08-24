module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('cars_fueltypes', [
      {
        id: 1,
        type: 'DIESEL',
      },
      {
        id: 2,
        type: 'ETANOL',
      },
      {
        id: 3,
        type: 'FLEX',
      },
      {
        id: 4,
        type: 'GASOLINA',
      },
      {
        id: 5,
        type: 'GNV',

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
