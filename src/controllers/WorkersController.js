import Sequelize from 'sequelize';

import Worker from '../models/Worker';
import WorkerContact from '../models/WorkerContact';
import WorkerContract from '../models/WorkerContract';
import WorkerJobtype from '../models/WorkerJobtype';
import WorkerAddress from '../models/WorkerAddress';
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

  // Store
  async store(req, res) {
    try {
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
      return res.json(workers);
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Store Upload
  async storeUpload(req, res) {
    try {
      return res.json(req.body);
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
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
