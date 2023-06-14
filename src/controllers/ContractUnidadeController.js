import ContractUnidade from '../models/ContractUnidade';
import Contract from '../models/Contract';
import Unidade from '../models/Unidade';

class ContractUnidadeController {
  // Index

  async index(req, res) {
    try {
      const result = await ContractUnidade.findAll({
        include: [
          {
            model: Contract,
            attributes: ['codigo_sipac', 'objeto'],
          },
          { model: Unidade, attributes: ['id', 'nome_unidade'] },
        ],
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
      const contract = await ContractUnidade.create(req.body);
      return res.json(contract);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new ContractUnidadeController();
