import Sequelize from 'sequelize';
import { extname } from 'path';

import WorkerManualfrequencytype from '../models/WorkerManualfrequencytype';
import WorkerManualfrequencyItem from '../models/WorkerManualfrequencyItem';
import WorkerManualfrequency from '../models/WorkerManualfrequency';
import Worker from '../models/Worker';

class WorkerManualfrequencyItemController {
  // Index
  async index(req, res) {
    try {
      const result = await WorkerManualfrequencyItem.findAll({
        include: [WorkerManualfrequency, WorkerManualfrequencytype, Worker],
      });
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
}

export default new WorkerManualfrequencyItemController();
