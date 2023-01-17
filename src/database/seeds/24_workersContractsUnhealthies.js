module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('workers_contracts_unhealthies', [
      {
        id: 1,
        unhealthy: 'RUÍDO CONTÍNUO OU INTERMITENTE',
        percentage: 0.30,
      },
      {
        id: 2,
        unhealthy: 'RUÍDO DE IMPACTO',
        percentage: 0.30,
      },
      {
        id: 3,
        unhealthy: 'POEIRAS MINERAIS',
        percentage: 0.30,
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
