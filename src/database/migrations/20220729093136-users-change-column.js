module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down() {
  },
};
