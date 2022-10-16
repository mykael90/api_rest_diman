import Sequelize, { QueryTypes } from 'sequelize';

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
            [Sequelize.fn('FORMAT', Sequelize.col('reserve_inventory'), '2'), 'reserveInventory'],
            [Sequelize.fn('FORMAT', Sequelize.col('restrict_inventory'), '2'), 'restrictInventory'],
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

  async rawQueriesInventory(req, res) {
    try {
      const users = await MaterialInventory.sequelize.query('SELECT m.req_maintenance, i.material_id, mat.name, mat.unit, SUM(i.quantity) as entrySum, t1.restrictSum, t2.releaseSum, t3.outSum, (t2.releaseSum-t1.restrictSum+SUM(i.quantity)) as Released, (t1.restrictSum-t2.releaseSum) as Restricted, (t2.releaseSum-t1.restrictSum+SUM(i.quantity)-t3.outSum) as commonBalance, (SUM(i.quantity)-t3.outSum) as totalBalance FROM ((((materials_in_items as i left join materials as mat on i.material_id=mat.id) left join materials_in as m on i.material_in_id=m.id) left join (SELECT ires.material_id, SUM(ires.quantity) as restrictSum, res.material_in_id FROM materials_restrict_items as ires left join materials_restrict as res on ires.material_restrict_id=res.id GROUP BY ires.material_id, res.material_in_id) as t1 on i.material_id=t1.material_id AND m.id=t1.material_in_id) left join (SELECT irel.material_id, SUM(irel.quantity) as releaseSum, rel.material_in_id FROM materials_release_items as irel left join materials_release as rel on irel.material_release_id=rel.id GROUP BY irel.material_id, rel.material_in_id) as t2 on i.material_id=t2.material_id AND m.id=t2.material_in_id) left join (SELECT iout.material_id, SUM(iout.quantity) as outSum, o.req_maintenance FROM materials_out_items as iout left join materials_out as o on iout.material_out_id=o.id GROUP BY iout.material_id, o.req_maintenance) as t3 on i.material_id=t3.material_id AND m.req_maintenance=t3.req_maintenance GROUP BY i.material_id, m.req_maintenance', { type: QueryTypes.SELECT });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new MaterialInventoryController();
