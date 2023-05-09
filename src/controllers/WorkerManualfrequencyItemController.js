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
        lastDay = new Date(endDate[0], Number(endDate[1]) - 1, endDate[2]);
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
                    [Op.or]: [{ [Op.gt]: lastDay }, { [Op.is]: null }],
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
                        [Op.lt]: lastDay,
                        [Op.gt]: firstDay,
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
}

export default new WorkerManualfrequencyItemController();
