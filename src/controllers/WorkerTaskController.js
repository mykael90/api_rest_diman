import Sequelize from 'sequelize';
import { extname } from 'path';

import WorkerTask from '../models/WorkerTask';
import WorkerTaskItem from '../models/WorkerTaskItem';
import WorkerTaskServant from '../models/WorkerTaskServant';
import WorkerTaskRisk from '../models/WorkerTaskRisk';
import WorkerTaskRisktype from '../models/WorkerTaskRisktype';
import WorkerTaskStatus from '../models/WorkerTaskStatus';
import WorkerTaskStatusPhoto from '../models/WorkerTaskStatusPhoto';
import WorkerTaskStatustype from '../models/WorkerTaskStatustype';
import BuildingSipac from '../models/BuildingSipac';
import PropertySipac from '../models/PropertySipac';
import User from '../models/User';
import UserPosition from '../models/UserPosition';
import UserPositiontype from '../models/UserPositiontype';
import Worker from '../models/Worker';
import WorkerContract from '../models/WorkerContract';
import WorkerJobtype from '../models/WorkerJobtype';
import Contract from '../models/Contract';
import Provider from '../models/Provider';

class WorkerTaskController {
  // Index
  async index(req, res) {
    try {
      const result = await WorkerTask.findAll({
        attributes: {
          include: [
            [Sequelize.dataBr('`WorkerTask`.`start`'), 'startBr'],
            [Sequelize.dataBr('`WorkerTask`.`end`'), 'endBr'],
          ],
        },
        include: [
          {
            model: WorkerTaskItem,
            include: [
              {
                model: Worker,
                attributes: ['name'],
                include: [
                  {
                    model: WorkerContract,
                    // attributes: ['WorkerJobtype'],
                    include: [
                      WorkerJobtype,
                      { model: Contract, include: [Provider] },
                    ],
                    where: {
                      end: null,
                    },
                  },
                ],
              },
            ],
          },
          {
            model: WorkerTaskServant,
            include: [
              {
                model: User,
                attributes: ['name'],
                include: [
                  {
                    model: UserPosition,
                    include: [UserPositiontype],
                  },
                ],
              },
            ],
          },
          BuildingSipac,
          PropertySipac,
          {
            model: WorkerTaskRisk,
            include: [
              {
                model: WorkerTaskRisktype,
              },
            ],
          },
          {
            model: WorkerTaskStatus,
            attributes: {
              include: [
                [
                  Sequelize.dataHoraBr('`WorkerTaskStatuses`.`created_at`'),
                  'createdAtBr',
                ],
              ],
            },
            include: [
              User,
              {
                model: WorkerTaskStatusPhoto,
              },
              {
                model: WorkerTaskStatustype,
              },
            ],
          },
        ],
        order: [
          ['id', 'DESC'],
          [WorkerTaskStatus, 'id', 'DESC'],
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
        include: [
          WorkerTaskRisk,
          WorkerTaskItem,
          WorkerTaskServant,
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
      if (!req.file) return res.json(workerTask);

      // If has file --->
      req.result = { ...workerTask.dataValues };
      req.dimensionResized = 600; // new dimension to photo
      const fileExtension = extname(req.file.originalname);
      req.fileName = `${Worker.name.toLowerCase()}_${
        req.result.id
      }${fileExtension}`;
      // update filename field on database
      await Worker.update(
        { filenamePhoto: req.fileName },
        {
          where: {
            id: req.result.id,
          },
        }
      );
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
