import Contract from '../models/Contract';
import Provider from '../models/Provider';

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
        include: {
          model: Provider,
          attributes: [],
          required: false,
        },
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
