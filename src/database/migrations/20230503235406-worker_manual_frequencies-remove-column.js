module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'workers_manualfrequencies',
      'filename_document'
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
