module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('carstypes', [
      {
        id: 1,
        type: 'CAMINHÃO TOCO',
      },
      {
        id: 2,
        type: 'CAMINHONETE',
      },
      {
        id: 3,
        type: 'MICRO-ÔNIBUS',
      },
      {
        id: 4,
        type: 'MOTOCICLETA',
      },
      {
        id: 5,
        type: 'ÔNIBUS',
      },
      {
        id: 6,
        type: 'CARRO DE PASSEIO',
      },
      {
        id: 7,
        type: 'REBOQUE (CARROCINHA)',
      },
      {
        id: 8,
        type: 'RETROESCAVADEIRA',
      },
      {
        id: 9,
        type: 'VAN',
      },
      {
        id: 10,
        type: 'CAMINHÃO BAÚ',
      },
      {
        id: 11,
        type: 'CAMINHÃO 3/4',
      },
      {
        id: 12,
        type: 'CAMINHÃO TRUCK',
      },
      {
        id: 13,
        type: 'MINICARREGADEIRA',
      },
      {
        id: 14,
        type: 'PÁ CARREGADEIRA',
      },
    ], {});
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
