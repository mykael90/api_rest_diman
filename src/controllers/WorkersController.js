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

      // console.log(result);

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

  // UpdateNew
  async updateNew(req, res, next) {
    try {
      const { id } = req.body;
      console.log('id', id);

      if (!id) {
        return res.status(400).json({
          errors: 'WorkerId não enviado',
        });
      }

      // TEM QUE ESTAR EXATAMENTE NO MESMO PADRÃO DE ORNDEMANENTO QUE ALIMENTA O FORM
      const worker = await Worker.findByPk(id, {
        include: [
          { model: WorkerContract },
        ],
        order: [[WorkerContract, 'start', 'ASC']], // IMPORTANTE O ORDENAMENTO
      });

      if (!worker) {
        return res.status(400).json({
          errors: 'Parâmetro de id de Worker não localizado no banco',
        });
      }

      console.log('vem do body', JSON.stringify(req.body.WorkerContracts));
      console.log('valor procurado', JSON.stringify(worker.WorkerContracts));

      // ATUALIZANDO VALORES DE SUBTABELAS----> ORDEM DEVE SER IDENTICA DOS 2 ARRAYS !
      // NÃO CONSEGUI ATUAALIZAR O CAMPO "WorkerJobtypeId"
      // nao entendi pq. Pode ser algo relacionado ao nome (desisti, para os outros campos funciona)
      Object.entries(req.body).forEach((item) => {
        if (Array.isArray(item[1])) {
          item[1].forEach((value, i) => {
            // verificar se existe o subregistro, se existir atualiza, se nao cria
            if (worker[item[0]][i]) {
              console.log('fixando cada contrato', value, worker[item[0]][i]);
              worker[item[0]][i].set(value);
            } else {
              worker.createWorkerContract(value);
            }
          });
        }
      });

      // FILTRAR CHAVES APENAS DA TABELA PRINCIPAL (SEM ARRAYS DE SUBTABELAS)
      const mainTableUpdate = Object.entries(req.body)
        .filter((entry) => !Array.isArray(entry[1]))
        .reduce((obj, entry) => Object.assign(obj, {
          [entry[0]]: entry[1],
        }), {});

      console.log('MAINTABLE', mainTableUpdate);

      // worker.WorkerContracts[0].set(req.body.WorkerContracts[0]);

      // eslint-disable-next-line max-len
      // req.body.WorkerContracts.forEach((contract, index) => worker.WorkerContracts[index].set(contract));

      // console.log(req.body.WorkerContracts[0]);

      // delete req.body.WorkerContracts;

      worker.set(mainTableUpdate);
      // await worker.WorkerContracts[0].save();

      for (const item of worker.WorkerContracts) {
        try {
          console.log('salvando cada contrato', item);
          await item.save();
        } catch (e) {
          console.log(e.message);
        }
      }

      await worker.save();

      return res.json(worker);

      // const result = await Worker.update(req.body, {
      //   where: {
      //     id,
      //   },
      // });

      // console.log(result);

      // if (!req.file) return res.json(result);

      // // If has file --->
      // req.dimensionResized = 600; // new dimension to photo
      // const fileExtension = extname(req.file.originalname);
      // req.fileName = `${Worker.name.toLowerCase()}_${id}${fileExtension}`;
      // // update filename field on database
      // await Worker.update({ filenamePhoto: req.fileName }, {
      //   where: {
      //     id,
      //   },
      // });
      // return next(); // go to uploadController
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const worker = await Worker.findByPk(req.params.id, {
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
        order: [[WorkerContract, 'start', 'ASC']],
      });
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
