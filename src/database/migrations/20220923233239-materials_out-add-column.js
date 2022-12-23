module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_out', // table name
        'material_outtype_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'materials_outtypes',
            key: 'id',
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT',
        },
      )]);
  },

  down() {
  },
};
