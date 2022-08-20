import Material from '../models/Material';

class MaterialController {
  // Index

  async index(req, res) {
    try {
      const result = await Material.findAll({
        // attributes: ['id', 'type'],
        order: [['id', 'ASC']],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialController();
