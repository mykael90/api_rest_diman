const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert('users', [
      {
        nome: 'Luiz',
        email: 'luiz@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Myka',
        email: 'myka@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Rafa',
        email: 'rafa@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },

    ]);
  },

  down() {},
};
