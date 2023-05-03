import Sequelize from 'sequelize';
import { extname } from 'path';

import WorkerManualfrequency from '../models/WorkerManualfrequency';
import WorkerManualfrequencytype from '../models/WorkerManualfrequencytype';
import WorkerManualfrequencyItem from '../models/WorkerManualfrequencyItem';
import User from '../models/User';
import Contract from '../models/Contract';
import Unidade from '../models/Unidade';

class WWorkerManualfrequencyController {
  // Index
  async index(req, res) {
    try {
      const result = await WorkerManualfrequency.findAll({
        include: [User, Contract, Unidade, WorkerManualfrequencyItem],
      });
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
}

export default new WWorkerManualfrequencyController();
