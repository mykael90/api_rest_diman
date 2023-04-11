const data = [
  {
    id: 1,
    type: 'ATENDIMENTO CIVIL',
  },
  {
    id: 2,
    type: 'ATENDIMENTO ELÉTRICA',
  },
  {
    id: 3,
    type: 'TRANSLADO/TRANSPORTE',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('workers_taskstypes', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
