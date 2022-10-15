module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_in', // table name
        'invoice', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          comment: 'NOTA FISCAL',
        },
      ),
    ]);
  },

  down() {
  },
};
