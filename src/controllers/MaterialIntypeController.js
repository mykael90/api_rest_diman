import MaterialIntype from '../models/MaterialIntype';
import MaterialIn from '../models/MaterialIn';

class MaterialIntypeController {
  // Index

  async index(req, res) {
    try {
      const result = await MaterialIntype.findAll({
        attributes: ['id', 'type'],
        order: [['id', 'ASC']],
        include: [{
          model: MaterialIn,
          attributes: ['id', 'req', 'user_id'],
        }],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialIntypeController();
