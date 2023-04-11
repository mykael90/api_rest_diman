import Sequelize from 'sequelize';
import { extname } from 'path';

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
            include: [
              {
                model: WorkerTaskStatusPhoto,
              },
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

  // Store with upload (if necessary)
  async store(req, res, next) {
    // COLOCAR NUMA TRANSACTIONS TUDO
    try {
      console.log(req.body);
      const workerTask = await WorkerTask.create(req.body, {
        include: [WorkerTaskRisk, WorkerTaskItem, WorkerTaskServant, {
          model: WorkerTaskStatus,
          include: [
            {
              model: WorkerTaskStatusPhoto,
            },
          ],
        }],
      });
      if (!req.file) return res.json(workerTask);

      // If has file --->
      req.result = { ...workerTask.dataValues };
      req.dimensionResized = 600; // new dimension to photo
      const fileExtension = extname(req.file.originalname);
      req.fileName = `${Worker.name.toLowerCase()}_${req.result.id}${fileExtension}`;
      // update filename field on database
      await Worker.update({ filenamePhoto: req.fileName }, {
        where: {
          id: req.result.id,
        },
      });
      return next(); // go to uploadController
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new WorkerTaskController();
