module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('workers_contracts_regimes', [
      {
        id: 1,
        regime: '20 h',
      },
      {
        id: 2,
        regime: '30 h',
      },
      {
        id: 3,
        regime: '40 h',
      },
      {
        id: 4,
        regime: '44 h',
      },
      {
        id: 5,
        regime: '12x36 h DIURNO',
      },
      {
        id: 6,
        regime: '12x36 h NOTURNO',
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
