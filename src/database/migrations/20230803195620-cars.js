module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('cars', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cartype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carstypes',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      car_fueltype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cars_fueltypes',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alias: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plate: {
        type: Sequelize.STRING(7),
        allowNull: false,
        validate: {
          len: [7, 7],
        },
      },
      renavan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      year: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      obs: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        default: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        default: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
