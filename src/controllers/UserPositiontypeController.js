import UserPositiontype from '../models/UserPositiontype';
import User from '../models/User';

class UserPositiontypeController {
  // Index

  async index(req, res) {
    try {
      const result = await UserPositiontype.findAll({
        attributes: ['id', 'position', 'level'],
        order: [['position', 'ASC']],
        include: [{
          model: User,
          attributes: ['name'],
          through: { attributes: ['matSiape'] },
        }],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new UserPositiontypeController();
