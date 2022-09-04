import Material from '../models/Material';

class MaterialController {
  // Index

  async index(req, res) {
    try {
      const result = await Material.findAll({
        attributes: ['id', 'id_catmat', 'name', 'unit', 'specification', 'group_sipac', 'filename_photo'],
        order: [['id', 'ASC']],
        where: {
          is_inactive: false,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const material = await Material.create(req.body);
      return res.json(material);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new MaterialController();
