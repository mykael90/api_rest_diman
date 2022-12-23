import ContractValidytype from '../models/ContractValidytype';

class ContractValidytypeController {
  // Index

  async index(req, res) {
    try {
      const result = await ContractValidytype.findAll({});
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
      const contractValidytype = await ContractValidytype.create(req.body);
      return res.json(contractValidytype);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new ContractValidytypeController();
