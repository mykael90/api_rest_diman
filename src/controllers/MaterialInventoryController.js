import Sequelize from 'sequelize';

import MaterialInventory from '../models/MaterialInventory';
import Material from '../models/Material';

class MaterialInventoryController {
  // Index

  async index(req, res) {
    try {
      const result = await MaterialInventory.findAll(
        {
          attributes: [
            'materialId',
            [Sequelize.literal('`Material`.`name`'), 'name'],
            [Sequelize.literal('`Material`.`specification`'), 'specification'],
            [Sequelize.literal('`Material`.`unit`'), 'unit'],
            [Sequelize.fn('FORMAT', Sequelize.col('initial_quantity'), '2'), 'initialQuantity'],
            [Sequelize.fn('FORMAT', Sequelize.col('release_inventory'), '2'), 'releaseInventory'],
            [Sequelize.fn('FORMAT', Sequelize.col('restrict_inventory'), '2'), 'restrictInventory'],
            'freeInventory',
            'totalInventory',
          ],
          include: {
            model: Material,
            attributes: [],
            required: false,
          },
        },
      );
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
      const material = await MaterialInventory.create(req.body);
      return res.json(material);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new MaterialInventoryController();
