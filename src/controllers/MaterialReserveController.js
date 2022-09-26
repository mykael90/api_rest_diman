import Sequelize from 'sequelize';

import MaterialReserve from '../models/MaterialReserve';
import Material from '../models/Material';
import MaterialReserveItem from '../models/MaterialReserveItem';
import User from '../models/User';

class MaterialReserveController {
  async store(req, res) {
    try {
      const result = await MaterialReserve.create(
        {
          reqMaintenance: req.body.reqMaintenance,
          userId: req.body.userId,
          authorizedBy: req.body.authorizedBy,
          workerId: req.body.workerId,
          campusId: req.body.campusId,
          separatedAt: req.body.separatedAt,
          withdrawnAt: req.body.withdrawnAt,
          canceledAt: req.body.canceledAt,
          propertyId: req.body.propertyId,
          buildingId: req.body.buildingId,
          place: req.body.place,
          obs: req.body.obs,
          MaterialReserveItems: req.body.items,
        },
        {
          include: [MaterialReserveItem],
        },
      );
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Index

  async index(req, res) {
    try {
      const result = await MaterialReserve.findAll({
        attributes: [
          'id',
          'reqMaintenance',
          'userId',
          'authorizedBy',
          'workerId',
          'campusId',
          'propertyId',
          'buildingId',
          'place',
          'obs',
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialReserve`.`created_At`'),
              '%d/%m/%Y',
            ),
            'createdAt',
          ],
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialReserve`.`separated_At`'),
              '%d/%m/%Y',
            ),
            'separatedAt',
          ],
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialReserve`.`withdrawn_At`'),
              '%d/%m/%Y',
            ),
            'withdrawnAt',
          ],
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialReserve`.`canceled_At`'),
              '%d/%m/%Y',
            ),
            'canceledAt',
          ],
        ],
        include: [
          {
            model: MaterialReserveItem,
            attributes: [
              'material_id',
              [Sequelize.literal('`MaterialReserveItems->Material`.`name`'), 'name'],
              [Sequelize.literal('specification'), 'specification'],
              [Sequelize.literal('unit'), 'unit'],
              'quantity',
            ],
            required: false,
            include: {
              model: Material,
              attributes: [],
              required: false,
            },
          },
          {
            model: User,
            attributes: [],
            required: false,
          },
        ],
      });
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new MaterialReserveController();
