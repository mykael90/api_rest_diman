import Sequelize from 'sequelize';

import { extname } from 'path';

import Worker from '../models/Worker';
import WorkerContact from '../models/WorkerContact';
import WorkerContract from '../models/WorkerContract';
import WorkerJobtype from '../models/WorkerJobtype';
// import WorkerAddress from '../models/WorkerAddress';
import Address from '../models/Address';

class WorkersController {
  // Index
  async index(req, res) {
    try {
      const result = await Worker.findAll({
        attributes: {
          include: [[Sequelize.literal('`WorkerContracts->WorkerJobtype`.`job`'), 'job']],
        },
        order: [['name', 'ASC']],
        include: [
          {
            model: WorkerContact,
          },
          {
            model: WorkerContract,
            include: [{ model: WorkerJobtype }],
          },
          {
            model: Address,
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
    try {
      console.log(req.body);
      const workers = await Worker.create(req.body, {
        include: [
          {
            model: WorkerContact,
          },
          {
            model: WorkerContract,
          },
          {
            model: Address,
          },
        ],
      });
      if (!req.file) return res.json(workers);

      // If has file --->
      req.result = { ...workers.dataValues };
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

  // Update
  async update(req, res, next) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          errors: 'WorkerId não enviado',
        });
      }

      const worker = await Worker.findByPk(id);

      if (!worker) {
        return res.status(400).json({
          errors: 'Parâmetro de id de Worker não localizado no banco',
        });
      }

      const result = await Worker.update(req.body, {
        where: {
          id,
        },
      });

      console.log(result);

      if (!req.file) return res.json(result);

      // If has file --->
      req.dimensionResized = 600; // new dimension to photo
      const fileExtension = extname(req.file.originalname);
      req.fileName = `${Worker.name.toLowerCase()}_${id}${fileExtension}`;
      // update filename field on database
      await Worker.update({ filenamePhoto: req.fileName }, {
        where: {
          id,
        },
      });
      return next(); // go to uploadController
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const worker = await Worker.findByPk(req.params.id);
      return res.json(worker);
    } catch (e) {
      return res.json(null);
    }
  }

  // IndexActives = funcionários com contrato ativo

  async indexActives(req, res) {
    try {
      const result = await Worker.findAll({
        attributes: [
          'id',
          'name',
          'email',
          'birthdate',
          'cpf',
          'filename_photo',
          'rg',
          [Sequelize.literal('`WorkerContracts->WorkerJobtype`.`job`'), 'job'],
        ],
        order: [['id', 'ASC']],
        include: [
          {
            model: WorkerContact,
            attributes: ['contacttype_id', 'contact', 'default', 'obs'],
          },
          {
            model: WorkerContract,
            attributes: [
              // 'workerId',
              // 'contractId',
              // 'workerJobtypeId',
              'start',
              'end',
            ],
            where: {
              end: null,
            },
            include: [{ model: WorkerJobtype }],
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

export default new WorkersController();
