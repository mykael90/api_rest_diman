module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('buildings_sections', 'id', {
      type: Sequelize.UUID,
      // defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    });
  },

  down() {},
};
