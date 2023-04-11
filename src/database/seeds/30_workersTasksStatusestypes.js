const data = [
  {
    id: 1,
    type: 'AGENDADO',
  },
  {
    id: 2,
    type: 'LIBERADO',
  },
  {
    id: 3,
    type: 'ENCERRADO',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('workers_tasks_statusestypes', data, {});
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
