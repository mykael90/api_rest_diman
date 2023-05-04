/* eslint-disable indent */
import Sequelize, { Op } from 'sequelize';
import { extname } from 'path';
import qs from 'qs';

import WorkerManualfrequencytype from '../models/WorkerManualfrequencytype';
import WorkerManualfrequencyItem from '../models/WorkerManualfrequencyItem';
import WorkerManualfrequency from '../models/WorkerManualfrequency';
import Worker from '../models/Worker';

class WorkerManualfrequencyItemController {
  // Index
  async index(req, res) {
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

      // Get the current date
      // const currentDate = new Date();

      // Get the first day of the current month
      // const firstDay = new Date(
      //   currentDate.getFullYear(),
      //   currentDate.getMonth(),
      //   1
      // );

      // Get the last day of the current month
      // const lastDay = new Date(
      //   currentDate.getFullYear(),
      //   currentDate.getMonth() + 1,
      //   0
      // );

      console.log(firstDay, lastDay);

      const result = await WorkerManualfrequencyItem.findAll({
        include: [
          {
            model: WorkerManualfrequency,
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
          Worker,
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
