import Sequelize from 'sequelize';

import Worker from '../models/Worker';
import WorkerContact from '../models/WorkerContact';

class WorkersController {
  // Index

  async index(req, res) {
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
        ],
        order: [['id', 'ASC']],
        include: [
          {
            model: WorkerContact,
            attributes: [
              'contacttype_id',
              // [
              //   Sequelize.literal('`WorkersContact->Contacttype`.`type`'),
              //   'name',
              // ],
              'contact',
              'default',
              'obs',
            ],
          },
        ],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const workers = await Worker.create(
        {
          name: req.body.name,
          email: req.body.email,
          birthdate: req.body.birthdate,
          cpf: req.body.cpf,
          filename_photo: req.body.filename_photo,
          rg: req.body.rg,
        },
        {
          include: [WorkerContact],
        }
      );
      return res.json(workers);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new WorkersController();
