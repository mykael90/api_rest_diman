module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'materials_out', // table name
        'material_out_discardtype_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'materials_out_discardtypes',
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
