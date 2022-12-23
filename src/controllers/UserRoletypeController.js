import UserRoletype from '../models/UserRoletype';
import User from '../models/User';

class UserRoletypeController {
  // Index

  async index(req, res) {
    try {
      const result = await UserRoletype.findAll({
        attributes: ['id', 'role', 'description'],
        order: [['role', 'ASC']],
        include: [{
          model: User,
          attributes: ['name'],
          through: { attributes: [] },
        }],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new UserRoletypeController();
