import Contacttype from '../models/Contacttype';

class ContactTypesController {
  // Index

  async index(req, res) {
    try {
      const result = await Contacttype.findAll({
        attributes: ['id', 'type'],
        order: [['id', 'ASC']],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const contactTypes = await Contacttype.create(req.body);
      return res.json(contactTypes);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ContactTypesController();
