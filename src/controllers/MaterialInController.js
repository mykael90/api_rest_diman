import Sequelize from 'sequelize';

import MaterialIn from '../models/MaterialIn';
import MaterialIntype from '../models/MaterialIntype';
import Material from '../models/Material';
import MaterialInItem from '../models/MaterialInItem';
import User from '../models/User';

class MaterialInController {
  async store(req, res) {
    const exists = await MaterialIn.findOne({ where: { req: req.body.req } });

    if (exists) {
      return res.status(406).json({
        errors: [`Recebimento não realizado, requisição ${req.body.req} já cadastrada no banco de dados`],
      });
    }

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
        attributes: ['id',
          'materialIntypeId',
          'userId',
          [Sequelize.literal('`MaterialIntype`.`type`'), 'type'],
          [Sequelize.literal('`User`.`username`'), 'receivedBy'],
          'req',
          'value',
          'requiredBy',
          'reqMaintenance',
          'reqUnit',
          'costUnit',
          'registerDate',
          [Sequelize.fn('date_format', Sequelize.col('`MaterialIn`.`created_At`'), '%Y-%m-%d'), 'createdAt']],
        include: [{
          model: MaterialInItem,
          attributes: ['material_id', [Sequelize.literal('`MaterialInItems->Material`.`name`'), 'name'], [Sequelize.literal('unit'), 'unit'], 'quantity', 'value'],
          required: false,
          include: {
            model: Material,
            attributes: [],
            required: false,
          },
        }, {
          model: User,
          attributes: [],
          required: true,
        },
        {
          model: MaterialIntype,
          required: false,
        },
        ],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialInController();
