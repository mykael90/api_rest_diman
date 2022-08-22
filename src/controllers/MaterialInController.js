import Sequelize from 'sequelize';

import MaterialIn from '../models/MaterialIn';
import MaterialIntype from '../models/MaterialIntype';
import Material from '../models/Material';
import MaterialInItem from '../models/MaterialInItem';

class MaterialInController {
  async store(req, res) {
    try {
      const result = await MaterialIn.create({
        materialIntypeId: req.body.materialIntypeId,
        req: req.body.req,
        userId: req.body.userId,
        value: req.body.value,
        requiredBy: req.body.requiredBy,
        reqMaintenance: req.body.reqMaintenance,
        reqUnit: req.body.reqUnit,
        costUnit: req.body.costUnit,
        registerDate: req.body.registerDate,

        MaterialInItems: req.body.items,

      }, {
        include: [MaterialInItem],
      });

      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index

  async index(req, res) {
    try {
      const result = await MaterialIn.findAll({
        include: [{
          model: MaterialInItem,
          attributes: ['material_id', [Sequelize.literal('name'), 'name'], [Sequelize.literal('unit'), 'unit'], 'quantity', 'value'],
          required: false,
          include: {
            model: Material,
            attributes: [],
            required: false,
          },
        }],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialInController();
