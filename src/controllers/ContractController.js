import Contract from '../models/Contract';
import Provider from '../models/Provider';
import ContractUnidade from '../models/ContractUnidade';
import Unidade from '../models/Unidade';

class ContractController {
  // Index

  async index(req, res) {
    try {
      const result = await Contract.findAll({
        attributes: [
          'id',
          'provider_id',
          'codigoSipac',
          'value',
          'objeto',
          'start',
          'maxEnd',
        ],
        order: [['id', 'ASC']],
        required: false,
        include: [{
          model: Provider,
          attributes: ['id', 'nomeFantasia'],
          required: false,
        }, {
          model: ContractUnidade,
          include: [{
            model: Unidade,
            attributes: ['id', 'nomeUnidade', 'sigla'],
          }],
          required: false,
        }],
      });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Store
  async store(req, res) {
    try {
      const contract = await Contract.create(req.body);
      return res.json(contract);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new ContractController();
