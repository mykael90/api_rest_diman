module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn(
      'buildings_sections',
      'building_sectionstype_id',
      'building_sectiontype_id'
    );
  },
  down() {},
};
