const data = require('../JSON/unidades_sipac.json');

function removeAccent(text) {
  if (typeof text === 'string') {
    text = text.toUpperCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'A');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'E');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'I');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'O');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'U');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'C');
    return text;
  }
}

const arr = data.sipac;

arr.forEach((obj) => {
  delete obj.unidade_gestora;
  delete obj.unidade_responsavel;
  delete obj.hierarquia;
  delete obj.ambiente_organizacional_unidade;
  delete obj.unidade_gestora;
  delete obj.email;
  delete obj.telefones;
  obj.nome_unidade = removeAccent(obj.nome_unidade);
  obj.sigla = removeAccent(obj.sigla);
  obj.data_criacao = obj.data_criacao.replace(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    '$3-$2-$1',
  );
  // eslint-disable-next-line no-unused-expressions
  if (obj.data_extincao.length <= 2) {
    obj.data_extincao = null;
  } else {
    obj.data_extincao = obj.data_extincao.replace(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      '$3-$2-$1',
    );
  }
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('unidades_sipac', arr, {});
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
