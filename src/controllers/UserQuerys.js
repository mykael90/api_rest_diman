import User from '../models/User';
import UserPositiontype from '../models/UserPositiontype';
import UserRoletype from '../models/UserRoletype';

class UserQuerys {
  // IndexAll
  async indexAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'username', 'email'],
        order: [['id', 'ASC']],
        include: [{
          model: UserPositiontype,
          required: true,
          attributes: ['position'],
          through: { attributes: ['matSiape', 'start', 'end'], where: { 'end': null } },
        },
        {
          model: UserRoletype,
          required: true,
          attributes: ['role'],
          through: { attributes: [], where: { } },
        }],
      }); // retornar só esses 3 atributos
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new UserQuerys();
