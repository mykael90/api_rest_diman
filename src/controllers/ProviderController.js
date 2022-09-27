import Provider from '../models/Provider';

class ProviderController {
  // Index

  async index(req, res) {
    try {
      const result = await Provider.findAll({
        attributes: ['id', 'cpfCnpj', 'razaoSocial', 'nomeFantasia'],
        order: [['id', 'ASC']],
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
      const provider = await Provider.create(req.body);
      return res.json(provider);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new ProviderController();
