module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users_personals', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rg_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(30),
        allowNull: false,
        default: 'BRASIL',
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complement: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      contact_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users_personal');
  },
};
