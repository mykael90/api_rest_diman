/* eslint-disable indent */
import Sequelize, { Op } from 'sequelize';
import { extname } from 'path';
import qs from 'qs';

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

      const queryParams =
        Object.keys(req.query).length === 0 ? false : qs.parse(req.query);

      if (queryParams) {
        const start = queryParams.start?.split(',');
        const end = queryParams.end?.split(',');

        firstDay = new Date(start[0], start[1], start[2]);
        lastDay = new Date(end[0], end[1], end[2]);
      }

      const result = await Worker.findAll({
        include: [
          {
            model: WorkerContract,
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
            include: [
              {
                model: WorkerManualfrequency,
                include: [Unidade, Contract],
                where: queryParams
                  ? {
                      date: {
                        [Op.lt]: lastDay,
                        [Op.gt]: firstDay,
                      },
                      unidade_id: queryParams.unidade_id,
                      contract_id: queryParams.contract_id,
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
