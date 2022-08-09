import UserThirdtype from '../models/UserThirdtype';
import User from '../models/User';

class UserThirdtypeController {
  // Index

  async index(req, res) {
    try {
      const result = await UserThirdtype.findAll({
        attributes: ['id', 'job'],
        order: [['job', 'ASC']],
        include: [{
          model: User,
          attributes: ['name'],
          through: { attributes: ['contract', 'start'] },
        }],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new UserThirdtypeController();
