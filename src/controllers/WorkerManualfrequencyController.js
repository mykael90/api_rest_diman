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

  async store(req, res) {
    // COLOCAR NUMA TRANSACTIONS TUDO
    try {
      const workerTask = await WorkerManualfrequency.create(req.body, {
        include: [WorkerManualfrequencyItem],
      });
      return res.json(workerTask);
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new WorkerManualfrequencyController();
