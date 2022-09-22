import Sequelize from 'sequelize';

import Contacttype from '../models/Contacttype';
import WorkerContact from '../models/WorkerContact';

class WorkersContactController {
  // Index

  async index(req, res) {
    try {
      const result = await WorkerContact.findAll({
        attributes: [
          'contacttype_id',
          [Sequelize.literal('type'), 'type'],
          'contact',
          'default',
          'obs',
        ],
        order: [['contacttype_id']],
        required: false,
        include: {
          model: Contacttype,
          attributes: [],
          required: false,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const workersContact = await WorkerContact.create(req.body);
      return res.json(workersContact);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new WorkersContactController();
