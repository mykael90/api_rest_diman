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
            [Sequelize.fn('ROUND', Sequelize.col('initial_quantity'), '2'), 'initialQuantity'],
            [Sequelize.fn('ROUND', Sequelize.col('release_inventory'), '2'), 'releaseInventory'],
            [Sequelize.fn('ROUND', Sequelize.col('reserve_inventory'), '2'), 'reserveInventory'],
            [Sequelize.fn('ROUND', Sequelize.col('restrict_inventory'), '2'), 'restrictInventory'],
            'freeInventory',
            'totalInventory',
            [Sequelize.currencyBr('initial_value'), 'initialValue'],
            [Sequelize.currencyBr('updated_value'), 'updatedValue'],
            [Sequelize.fn('IFNULL', Sequelize.currencyBr('updated_value'), Sequelize.currencyBr('initial_value')), 'value'],
          ],
          include: {
            model: Material,
            attributes: [],
            required: false,
            order: [
              ['name', 'ASC'],
            ],
          },
          order: [
            [Sequelize.col('name'), 'ASC'],
          ],
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

  // Update
  async update(req, res) {
    try {
      const { materialId } = req.params;

      if (!materialId) {
        return res.status(400).json({
          errors: 'MaterialId não enviado',
        });
      }

      const material = await MaterialInventory.findByPk(materialId);

      if (!material) {
        return res.status(400).json({
          errors: 'Parâmetro de id do material não localizado no banco',
        });
      }

      const result = await MaterialInventory.update(req.body, {
        where: {
          materialId,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const { materialId } = req.params;

      if (!materialId) {
        return res.status(400).json({
          errors: 'MaterialId não enviado',
        });
      }

      const result = await MaterialInventory.findByPk(materialId);

      if (!result) {
        return res.status(400).json({
          errors: 'Parâmetro de id do material não localizado no banco',
        });
      }

      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new MaterialInventoryController();
