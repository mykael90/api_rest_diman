import Sequelize from 'sequelize';

import MaterialOut from '../models/MaterialOut';
import MaterialOuttype from '../models/MaterialOuttype';
import Material from '../models/Material';
import MaterialOutItem from '../models/MaterialOutItem';
import User from '../models/User';
import Worker from '../models/Worker';
import MaterialIn from '../models/MaterialIn';
import MaterialInItem from '../models/MaterialInItem';

class MaterialOutController {
  async store(req, res) {
    try {
      const result = await MaterialOut.create(
        req.body,
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
          [Sequelize.literal('`MaterialOuttype`.`type`'), 'type'],
          'reqMaintenance',
          'reqMaterial',
          'userId',
          [Sequelize.literal('`User`.`username`'), 'userUsername'],
          'authorizedBy',
          [Sequelize.literal('`authorizer`.`username`'), 'authorizerUsername'],
          [Sequelize.literal('`Worker`.`name`'), 'removedBy'],
          'workerId',
          'campusId',
          'propertyId',
          'buildingId',
          'place',
          'obs',
          [Sequelize.currencyBr('`MaterialOut`.`value`'), 'value'],
          [Sequelize.dataHoraBr(
            '`MaterialOut`.`created_at`',
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
          'userReplacementId'],
        include: [
          {
            model: MaterialOutItem,
            attributes: [
              ['material_id', 'materialId'],
              [Sequelize.literal('`MaterialOutItems->Material`.`name`'), 'name'],
              [Sequelize.literal('`MaterialOutItems->Material`.`specification`'), 'specification'],
              [Sequelize.literal('`MaterialOutItems->Material`.`unit`'), 'unit'],
              [Sequelize.currencyBr('`MaterialOutItems`.`value`'), 'value'],
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
            model: MaterialIn,
            attributes: ['id', 'value', [Sequelize.currencyBr('`MaterialReturned`.`value`'), 'valueBr'], ['created_at', 'createdAt'], [Sequelize.dataHoraBr(
              '`MaterialReturned`.`created_at`',
            ),
            'createdAtBr']],
            as: 'MaterialReturned',
            required: false,
            include:
              {
                model: MaterialInItem,
                attributes: [
                  ['material_id', 'materialId'],
                  [Sequelize.literal('`MaterialReturned->MaterialInItems->Material`.`name`'), 'name'],
                  [Sequelize.literal('`MaterialReturned->MaterialInItems->Material`.`specification`'), 'specification'],
                  [Sequelize.literal('`MaterialReturned->MaterialInItems->Material`.`unit`'), 'unit'],
                  'quantity',
                  [Sequelize.currencyBr('`MaterialReturned->MaterialInItems`.`value`'), 'value'],
                ],
                required: false,
                include: {
                  model: Material,
                  attributes: [],
                  required: false,
                },
              },
          },
          {
            model: User,
            attributes: [],
            as: 'authorizer',
            required: false,
          },
          {
            model: Worker,
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

  // Update
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: 'MaterialOutId não enviado',
        });
      }

      const materialOut = await MaterialOut.findByPk(id);

      if (!materialOut) {
        return res.status(400).json({
          errors: 'Parâmetro de id de Saída de Material não localizado no banco',
        });
      }

      const result = await MaterialOut.update(req.body, {
        where: {
          id,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new MaterialOutController();
