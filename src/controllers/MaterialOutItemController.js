import Sequelize from 'sequelize';

import Material from '../models/Material';
import MaterialOut from '../models/MaterialOut';
import MaterialOutItem from '../models/MaterialOutItem';

class MaterialOutItemController {
  async index(req, res) {
    try {
      const result = await MaterialOutItem.findAll({
        group: ['material_id'],
        order: Sequelize.literal('name'),
        required: false,
        include: {
          model: Material,
          attributes: [],
          required: false,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Relação de material
  async indexMaterialWorker(req, res) {
    try {
      const result = await Material.findAll({
        order: Sequelize.literal('name'),
        include: {
          model: MaterialOutItem,
          required: true,
          include: {
            model: MaterialOut,
            attributes: ['workerId'],
            required: true,
          },
        },
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialOutItemController();
