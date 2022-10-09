const data = require('../JSON/properties_sipac.json');

data.forEach((obj) => {
  obj.area_terreno = obj.area_terreno.replace(/\./g, '')
    .replace(/,/g, '.')
    .replace(/[^0-9\.]+/gi, ''); // CONVERTER STRING PARA NUMERO PADRAO DO BANCO
  obj.valor_terreno = obj.valor_terreno.replace(/\./g, '')
    .replace(/,/g, '.')
    .replace(/[^0-9\.]+/gi, ''); // CONVERTER STRING PARA NUMERO PADRAO DO BANCO
  obj.qtd_area_construida = obj.qtd_area_construida.replace(/\./g, '')
    .replace(/,/g, '.')
    .replace(/[^0-9\.]+/gi, ''); // CONVERTER STRING PARA NUMERO PADRAO DO BANCO
  if (!obj.qtd_area_construida) obj.qtd_area_construida = 0;
  obj.qtd_area_construida_util = obj.qtd_area_construida_util.replace(/\./g, '')
    .replace(/,/g, '.')
    .replace(/[^0-9\.]+/gi, ''); // CONVERTER STRING PARA NUMERO PADRAO DO BANCO
  if (!obj.qtd_area_construida_util) obj.qtd_area_construida_util = 0;
  obj.valor_imovel = obj.valor_imovel.replace(/\./g, '')
    .replace(/,/g, '.')
    .replace(/[^0-9\.]+/gi, ''); // CONVERTER STRING PARA NUMERO PADRAO DO BANCO
  if (!obj.valor_imovel) obj.valor_imovel = 0;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('properties_sipac', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
