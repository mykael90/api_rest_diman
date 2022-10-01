import Contacttype from '../models/Contacttype';

class ContacttypesController {
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
      const contacttypes = await Contacttype.create(req.body);
      return res.json(contacttypes);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ContacttypesController();
