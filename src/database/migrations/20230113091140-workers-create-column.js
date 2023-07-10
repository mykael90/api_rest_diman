module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'workers', // table name
        'phone', // new field name
        {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
      ),
    ]);
  },

  down() {
  },
};
