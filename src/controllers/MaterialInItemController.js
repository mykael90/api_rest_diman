import Sequelize from 'sequelize';

import Material from '../models/Material';
import MaterialIn from '../models/MaterialIn';
import MaterialInItem from '../models/MaterialInItem';

class MaterialInItemController {
  async index(req, res) {
    try {
      const result = await MaterialInItem.findAll({
        attributes: [
          'material_id',
          [Sequelize.literal('name'), 'name'],
          [Sequelize.literal('specification'), 'specification'],
          [Sequelize.literal('unit'), 'unit'],
          [Sequelize.fn('sum', Sequelize.col('quantity')), 'total'],
        ],
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
          model: MaterialInItem,
          required: true,
          include: [MaterialIn],
        },
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialInItemController();
