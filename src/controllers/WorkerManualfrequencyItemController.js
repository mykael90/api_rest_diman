/* eslint-disable indent */
import Sequelize, { Op } from 'sequelize';
import { extname } from 'path';
import qs from 'qs';

import { orderBy } from 'lodash';
import WorkerManualfrequencytype from '../models/WorkerManualfrequencytype';
import WorkerManualfrequencyItem from '../models/WorkerManualfrequencyItem';
import WorkerManualfrequency from '../models/WorkerManualfrequency';
import Worker from '../models/Worker';
import WorkerContract from '../models/WorkerContract';
import WorkerJobtype from '../models/WorkerJobtype';
import Unidade from '../models/Unidade';
import Contract from '../models/Contract';

class WorkerManualfrequencyItemController {
  // Index
  async index(req, res) {
    console.log(req.query);
    try {
      let firstDay;
      let lastDay;

      const queryParams = Object.keys(req.query).length === 0 ? false : qs.parse(req.query);

      if (queryParams) {
        const startDate = queryParams.startDate?.split('-');
        const endDate = queryParams.endDate?.split('-');

        firstDay = new Date(
          startDate[0],
          Number(startDate[1]) - 1,
          startDate[2],
        );

        firstDay.setUTCHours(0, 0, 0, 0);

        lastDay = new Date(endDate[0], Number(endDate[1]) - 1, endDate[2]);
        lastDay.setUTCHours(23, 59, 59, 999);
      }

      const result = await Worker.findAll({
        include: [
          {
            model: WorkerContract,
            attributes: {
              include: [
                [Sequelize.dataBr('`WorkerContracts`.`start`'), 'startBr'],
              ],
            },
            include: [WorkerJobtype],
            where: queryParams
              ? {
                  end: {
                    [Op.or]: [{ [Op.gte]: lastDay }, { [Op.is]: null }],
                  },
                }
              : {},
          },
          {
            model: WorkerManualfrequencyItem,
            required: true,
            where: {
              WorkerManualfrequencytypeId: 1,
            },
            include: [
              {
                model: WorkerManualfrequency,
                include: [Unidade, Contract],
                order: [['date', 'DESC']],
                where: queryParams
                  ? {
                      date: {
                        [Op.lte]: lastDay,
                        [Op.gte]: firstDay,
                      },
                      UnidadeId: queryParams.UnidadeId,
                      ContractId: queryParams.ContractId,
                    }
                  : {},
              },
              WorkerManualfrequencytype,
            ],
          },
        ],
      });
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }

  // Store Bulk (multiple items)
  async store(req, res) {
    try {
      const data = await WorkerManualfrequencyItem.bulkCreate(req.body, {
        updateOnDuplicate: ['hours', 'obs', 'WorkerManualfrequencytypeId'],
      });
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const { WorkerId, WorkerManualfrequencyId } = req.body;

      if (!WorkerManualfrequencyId || !WorkerId) {
        return res.status(400).json({
          errors: 'Parâmetros não enviados',
        });
      }

      const newData = await WorkerManualfrequencyItem.update(req.body, {
        where: {
          worker_id: WorkerId,
          worker_manualfrequency_id: WorkerManualfrequencyId,
        },
        limit: 1,
      });

      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({
          errors: 'Parâmetros não enviados',
        });
      }

      console.log(req.body);

      const whereConditions = req.body.map((item) => ({
        [Op.and]: [
          { worker_id: item.WorkerId },
          { worker_manualfrequency_id: item.WorkerManualfrequencyId },
        ],
      }));

      console.log(whereConditions);

      const response = await WorkerManualfrequencyItem.destroy({
        where: {
          [Op.or]: whereConditions,
        },
      });

      if (!response) {
        return res.status(400).json({
          errors: 'Parâmetro(s) de id(s) não localizado(s) no banco',
        });
      }

      return res.json(null);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new WorkerManualfrequencyItemController();
