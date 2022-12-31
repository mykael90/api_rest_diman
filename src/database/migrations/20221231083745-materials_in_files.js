module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('materials_in_files', {
      filename: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      material_in_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'materials_in',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      original_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down() {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
