import Sequelize from 'sequelize';

import { extname } from 'path';
import { random_5 } from '../asset/script/getRandomNumber';

import MaterialOut from '../models/MaterialOut';
import MaterialOuttype from '../models/MaterialOuttype';
import Material from '../models/Material';
import MaterialOutItem from '../models/MaterialOutItem';
import User from '../models/User';
import Worker from '../models/Worker';
import WorkerContract from '../models/WorkerContract';
import WorkerJobtype from '../models/WorkerJobtype';
import MaterialIn from '../models/MaterialIn';
import MaterialInItem from '../models/MaterialInItem';

import MaterialOutFile from '../models/MaterialOutFile';

class MaterialOutController {
  async store(req, res) {
    try {
      const result = await MaterialOut.sequelize.transaction(async (t) => {
        const materialOut = await MaterialOut.create(req.body, {
          include: [MaterialOutItem],
          transaction: t,
        });
        return res.json(materialOut);
      });
      return result;
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async storeGeneral(req, res, next) {
    try {
      if (req.files) {
        // If has file --->
        req.body.MaterialOutFiles = [];

        // POVOANDO O ARRAY DOS ARQUIVOS
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const i in req.files) {
          const fileExtension = extname(req.files[i].originalname);
          req.files[i].newName = `${Date.now()}_${random_5()}${fileExtension}`;
          req.body.MaterialOutFiles.push({
            filename: req.files[i].newName,
            originalName: req.files[i].originalname,
            order: Number(i) + 1,
          });
        }
      }

      const materialOut = await MaterialOut.create(req.body, {
        include: [MaterialOutItem, MaterialOutFile],
      });

      if (req.files) {
        req.result = materialOut;
        return next(); // go to uploadController
      }

      return res.json(materialOut);
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
        attributes: {
          include: [
            [Sequelize.literal('`MaterialOuttype`.`type`'), 'type'],
            [Sequelize.literal('`User`.`username`'), 'userUsername'],
            [
              Sequelize.literal('`authorizer`.`username`'),
              'authorizerUsername',
            ],
            [Sequelize.literal('`Worker`.`name`'), 'removedBy'],
            [Sequelize.currencyBr('`MaterialOut`.`value`'), 'valueBr'],
            [Sequelize.dataHoraBr('`MaterialOut`.`created_at`'), 'createdAtBr'],
            [
              Sequelize.fn(
                'date_format',
                Sequelize.col('`MaterialOut`.`updated_At`'),
                '%d/%m/%Y'
              ),
              'updatedAtBr',
            ],
          ],
        },
        include: [
          {
            model: MaterialOutFile,
            order: [['order', 'ASC']],
          },
          {
            model: MaterialOutItem,
            attributes: [
              ['material_id', 'materialId'],
              [
                Sequelize.literal('`MaterialOutItems->Material`.`name`'),
                'name',
              ],
              [
                Sequelize.literal(
                  '`MaterialOutItems->Material`.`specification`'
                ),
                'specification',
              ],
              [
                Sequelize.literal('`MaterialOutItems->Material`.`unit`'),
                'unit',
              ],
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
            attributes: [
              'id',
              'value',
              [Sequelize.currencyBr('`MaterialReturned`.`value`'), 'valueBr'],
              ['created_at', 'createdAt'],
              [
                Sequelize.dataHoraBr('`MaterialReturned`.`created_at`'),
                'createdAtBr',
              ],
            ],
            as: 'MaterialReturned',
            required: false,
            include: {
              model: MaterialInItem,
              attributes: [
                ['material_id', 'materialId'],
                [
                  Sequelize.literal(
                    '`MaterialReturned->MaterialInItems->Material`.`name`'
                  ),
                  'name',
                ],
                [
                  Sequelize.literal(
                    '`MaterialReturned->MaterialInItems->Material`.`specification`'
                  ),
                  'specification',
                ],
                [
                  Sequelize.literal(
                    '`MaterialReturned->MaterialInItems->Material`.`unit`'
                  ),
                  'unit',
                ],
                'quantity',
                [
                  Sequelize.currencyBr(
                    '`MaterialReturned->MaterialInItems`.`value`'
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
          },
          {
            model: User,
            attributes: [],
            as: 'authorizer',
            required: false,
          },
          {
            model: Worker,
            required: false,
            include: {
              model: WorkerContract,
              include: {
                model: WorkerJobtype,
              },
            },
          },
          {
            model: MaterialOuttype,
            required: false,
          },
        ],
        order: [['id', 'DESC']],
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
          errors:
            'Parâmetro de id de Saída de Material não localizado no banco',
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
