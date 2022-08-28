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
}

export default new MaterialController();
