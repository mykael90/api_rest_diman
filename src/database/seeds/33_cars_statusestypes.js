module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('cars_statusestypes', [
      {
        id: 1,
        type: 'ATIVO',
      },
      {
        id: 2,
        type: 'OFICINA',
      },
      {
        id: 3,
        type: 'INATIVO',
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
