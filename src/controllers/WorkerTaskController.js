import Sequelize from 'sequelize';

import WorkerTask from '../models/WorkerTask';
import WorkerTaskItem from '../models/WorkerTaskItem';
import WorkerTaskServant from '../models/WorkerTaskServant';
import WorkerTaskRisk from '../models/WorkerTaskRisk';
import WorkerTaskStatus from '../models/WorkerTaskStatus';
import WorkerTaskStatusPhoto from '../models/WorkerTaskStatusPhoto';

class WorkerTaskController {
  // Index
  async index(req, res) {
    try {
      const result = await WorkerTask.findAll({
        include: [
          WorkerTaskItem,
          WorkerTaskServant,
          WorkerTaskRisk,
          {
            model: WorkerTaskStatus,
            include: [WorkerTaskStatusPhoto],
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

export default new WorkerTaskController();
