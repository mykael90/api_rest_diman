import Sequelize, { Op } from 'sequelize';
import { extname } from 'path';

import WorkerManualfrequency from '../models/WorkerManualfrequency';
import WorkerManualfrequencytype from '../models/WorkerManualfrequencytype';
import WorkerManualfrequencyItem from '../models/WorkerManualfrequencyItem';
import User from '../models/User';
import Contract from '../models/Contract';
import Unidade from '../models/Unidade';

class WorkerManualfrequencyController {
  // Index
  async index(req, res) {
    try {
      const result = await WorkerManualfrequency.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          Contract,
          Unidade,
          {
            model: WorkerManualfrequencyItem,
            include: [WorkerManualfrequencytype],
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

export default new WorkerManualfrequencyController();
