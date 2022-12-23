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
          [Sequelize.literal('contact'), 'contact'],
          [Sequelize.literal('default'), 'default'],
          [Sequelize.literal('obs'), 'obs'],
        ],
        group: ['contacttype_id'],
        order: Sequelize.literal('type'),
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
}

export default new WorkersContactController();
