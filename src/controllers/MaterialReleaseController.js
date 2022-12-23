import Sequelize from 'sequelize';

import MaterialRelease from '../models/MaterialRelease';
import MaterialIn from '../models/MaterialIn';
import Material from '../models/Material';
import MaterialReleaseItem from '../models/MaterialReleaseItem';
import User from '../models/User';

class MaterialReleaseController {
  async store(req, res) {
    try {
      const result = await MaterialRelease.create(
        {
          materialInId: req.body.materialInId,
          userId: req.body.userId,
          requiredBy: req.body.requiredBy,
          MaterialReleaseItems: req.body.items,
        },
        {
          include: [MaterialReleaseItem],
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
      const result = await MaterialRelease.findAll({
        attributes: [
          'id',
          'materialInId',
          'userId',
          'requiredBy',
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialRelease`.`created_At`'),
              '%d/%m/%Y',
            ),
            'createdAt',
          ],
        ],
        include: [
          {
            model: MaterialReleaseItem,
            attributes: [
              'material_id',
              [Sequelize.literal('`MaterialReleaseItems->Material`.`name`'), 'name'],
              [Sequelize.literal('specification'), 'specification'],
              [Sequelize.literal('unit'), 'unit'],
              'quantity',
              [
                Sequelize.fn(
                  'format',
                  Sequelize.col('`MaterialReleaseItems`.`value`'),
                  2,
                  'pt_BR',
                ),
                'value',
              ],
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
      return res.json(e);
    }
  }
}

export default new MaterialReleaseController();
