module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_reserve', // table name
        'req_material', // new field name
        {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
      )]);
  },

  down() {
  },
};
