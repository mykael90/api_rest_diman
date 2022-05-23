const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert('users', [
      {
        name: 'Luiz',
        email: 'luiz@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Myka',
        email: 'myka@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rafa',
        email: 'rafa@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },

    ]);
  },

  down() {},
};
