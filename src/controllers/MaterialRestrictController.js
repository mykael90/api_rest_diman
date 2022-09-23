import Sequelize from 'sequelize';

import MaterialRestrict from '../models/MaterialRestrict';
import MaterialIn from '../models/MaterialIn';
import Material from '../models/Material';
import MaterialRestrictItem from '../models/MaterialRestrictItem';
import User from '../models/User';

class MaterialRestrictController {
  async store(req, res) {
    try {
      const result = await MaterialRestrict.create(
        {
          materialInId: req.body.materialInId,
          userId: req.body.userId,
          requiredBy: req.body.requiredBy,
          MaterialRestrictItems: req.body.items,
        },
        {
          include: [MaterialRestrictItem],
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
      const result = await MaterialRestrict.findAll({
        attributes: [
          'id',
          'materialInId',
          'userId',
          'requiredBy',
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialRestrict`.`created_At`'),
              '%d/%m/%Y',
            ),
            'createdAt',
          ],
        ],
        include: [
          {
            model: MaterialRestrictItem,
            attributes: [
              'material_id',
              [Sequelize.literal('`MaterialRestrictItems->Material`.`name`'), 'name'],
              [Sequelize.literal('specification'), 'specification'],
              [Sequelize.literal('unit'), 'unit'],
              'quantity',
              [
                Sequelize.fn(
                  'format',
                  Sequelize.col('`MaterialRestrictItems`.`value`'),
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

export default new MaterialRestrictController();
