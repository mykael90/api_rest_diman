import Sequelize, { Op } from 'sequelize';

import MaterialReserve from '../models/MaterialReserve';
import Material from '../models/Material';
import MaterialReserveItem from '../models/MaterialReserveItem';
import User from '../models/User';
import Worker from '../models/Worker';

class MaterialReserveController {
  async store(req, res) {
    try {
      const result = await MaterialReserve.create(req.body, {
        include: [MaterialReserveItem],
      });
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
        attributes: {
          include: [
            [Sequelize.literal('`User`.`username`'), 'userUsername'],
            [
              Sequelize.literal('`authorizer`.`username`'),
              'authorizerUsername',
            ],
            [Sequelize.currencyBr('`MaterialReserve`.`value`'), 'valueBr'],
            [Sequelize.literal('`Worker`.`name`'), 'workerName'],
            [
              Sequelize.fn(
                'date_format',
                Sequelize.col('`MaterialReserve`.`intended_Use`'),
                '%d/%m/%Y',
              ),
              'intendedUseBr',
            ],
            [
              Sequelize.dataHoraBr('`MaterialReserve`.`created_at`'),
              'createdAtBr',
            ],
            [
              Sequelize.dataHoraBr('`MaterialReserve`.`separated_At`'),
              'separatedAtBr',
            ],
            [
              Sequelize.dataHoraBr('`MaterialReserve`.`withdrawn_At`'),
              'withdrawnAtBr',
            ],
            [
              Sequelize.dataHoraBr('`MaterialReserve`.`canceled_At`'),
              'canceledAtBr',
            ],
          ],
        },
        // order: [
        //   ['intendedUse', 'ASC'],
        // ],
        include: [
          {
            model: MaterialReserveItem,
            attributes: [
              ['material_id', 'materialId'],
              [
                Sequelize.literal('`MaterialReserveItems->Material`.`name`'),
                'name',
              ],
              [Sequelize.literal('specification'), 'specification'],
              [Sequelize.currencyBr('`MaterialReserveItems`.`value`'), 'value'],
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

  // IndexActives

  async indexActives(req, res) {
    const today = new Date();
    const twoDaysAfter = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    twoDaysAfter.setHours(23, 59, 59);
    try {
      const result = await MaterialReserve.findAll({
        attributes: {
          include: [
            [Sequelize.literal('`User`.`username`'), 'userUsername'],
            [Sequelize.literal('`authorizer`.`name`'), 'authorizerName'],
            [Sequelize.literal('`authorizer`.`id`'), 'authorizerId'],
            [
              Sequelize.literal('`authorizer`.`username`'),
              'authorizerUsername',
            ],
            [Sequelize.currencyBr('`MaterialReserve`.`value`'), 'valueBr'],
            [Sequelize.literal('`Worker`.`name`'), 'workerName'],
            [
              Sequelize.fn(
                'date_format',
                Sequelize.col('`MaterialReserve`.`intended_Use`'),
                '%d/%m/%Y',
              ),
              'intendedUseBr',
            ],
            [
              Sequelize.dataHoraBr('`MaterialReserve`.`created_at`'),
              'createdAtBr',
            ],
            [
              Sequelize.fn(
                'date_format',
                Sequelize.col('`MaterialReserve`.`separated_At`'),
                '%d/%m/%Y',
              ),
              'separatedAtBr',
            ],
            [
              Sequelize.fn(
                'date_format',
                Sequelize.col('`MaterialReserve`.`withdrawn_At`'),
                '%d/%m/%Y',
              ),
              'withdrawnAtBr',
            ],
            [
              Sequelize.fn(
                'date_format',
                Sequelize.col('`MaterialReserve`.`canceled_At`'),
                '%d/%m/%Y',
              ),
              'canceledAtBr',
            ],
          ],
        },
        order: [['intendedUse', 'ASC']],
        where: {
          [Op.and]: [
            { withdrawnAt: { [Op.is]: null } },
            { canceledAt: { [Op.is]: null } },
            {
              intendedUse: {
                [Op.lte]: twoDaysAfter,
              },
            },
          ],
        },
        include: [
          {
            model: MaterialReserveItem,
            attributes: [
              ['material_id', 'materialId'],
              [
                Sequelize.literal('`MaterialReserveItems->Material`.`name`'),
                'name',
              ],
              [Sequelize.literal('specification'), 'specification'],
              [Sequelize.currencyBr('`MaterialReserveItems`.`value`'), 'value'],
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
            model: User,
            as: 'authorizer',
            attributes: [],
            required: false,
          },
          {
            model: Worker,
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

  // Update
  async update(req, res) {
    try {
      const { materialReserveId } = req.params;

      if (!materialReserveId) {
        return res.status(400).json({
          errors: 'MaterialReserveId não enviado',
        });
      }

      const material = await MaterialReserve.findByPk(materialReserveId);

      if (!material) {
        return res.status(400).json({
          errors: 'Parâmetro de id do materialReserve não localizado no banco',
        });
      }

      const result = await MaterialReserve.update(req.body, {
        where: {
          id: materialReserveId,
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

export default new MaterialReserveController();
