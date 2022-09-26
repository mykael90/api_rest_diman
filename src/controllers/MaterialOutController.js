import Sequelize from 'sequelize';

import MaterialOut from '../models/MaterialOut';
import MaterialOuttype from '../models/MaterialOuttype';
import Material from '../models/Material';
import MaterialOutItem from '../models/MaterialOutItem';
import User from '../models/User';

class MaterialOutController {
  async store(req, res) {
    try {
      const result = await MaterialOut.create(
        {
          materialOuttypeId: req.body.materialOuttypeId,
          reqMaintenance: req.body.reqMaintenance,
          userId: req.body.userId,
          authorizedBy: req.body.authorizedBy,
          workerId: req.body.workerId,
          campusId: req.body.campusId,
          propertyId: req.body.propertyId,
          buildingId: req.body.buildingId,
          place: req.body.place,
          obs: req.body.obs,
          MaterialOutItems: req.body.items,
        },
        {
          include: [MaterialOutItem],
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
      const result = await MaterialOut.findAll({
        attributes: [
          'id',
          'materialOuttypeId',
          [Sequelize.literal('`MaterialIntype`.`type`'), 'type'],
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
              Sequelize.col('`MaterialOut`.`created_At`'),
              '%d/%m/%Y',
            ),
            'createdAt',
          ],
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialOut`.`updated_At`'),
              '%d/%m/%Y',
            ),
            'updatedAt',
          ],
        ],
        include: [
          {
            model: MaterialOutItem,
            attributes: [
              'material_id',
              [Sequelize.literal('`MaterialOutItems->Material`.`name`'), 'name'],
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
          {
            model: MaterialOuttype,
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

export default new MaterialOutController();
