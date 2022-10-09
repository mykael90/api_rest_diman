import ContractValidy from '../models/ContractValidy';

class ContractValidyController {
  // Index

  async index(req, res) {
    try {
      const result = await ContractValidy.findAll({});
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
      const contractValidy = await ContractValidy.create(req.body);
      return res.json(contractValidy);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new ContractValidyController();
