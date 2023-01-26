module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('workers_manualfrequenciestypes', [
      {
        id: 1,
        type: 'FALTA',
      },
      {
        id: 2,
        type: 'FALTA ABONADA',
      },
      {
        id: 3,
        type: 'PRESENTE',
      },
      {
        id: 4,
        type: 'CAMPO',
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
