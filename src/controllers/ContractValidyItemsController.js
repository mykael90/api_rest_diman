import ContractValidyItem from '../models/ContractValidyItem';

class ContractValidyItemController {
  // Index

  async index(req, res) {
    try {
      const result = await ContractValidyItem.findAll({});
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
      const contractValidyItem = await ContractValidyItem.create(req.body);
      return res.json(contractValidyItem);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new ContractValidyItemController();
