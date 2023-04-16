module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('buildings_sections', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      building_sectiontype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'buildings_sectionstypes',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      building_sipac_sub_rip: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'buildings_sipac',
          key: 'sub_rip',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      super_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('buildings_sections');
  },
};
