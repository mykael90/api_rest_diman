module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'workers', // table name
        'phone', // new field name
        {
          type: Sequelize.STRING(11),
          allowNull: true,
        },
      ),
    ]);
  },

  down() {
  },
};
