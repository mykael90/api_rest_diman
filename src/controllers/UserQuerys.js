import User from '../models/User';
import UserPersonal from '../models/UserPersonal';
import UserPosition from '../models/UserPosition';
import UserThird from '../models/UserThird';
import UserRole from '../models/UserRole';
import UserPositiontype from '../models/UserPositiontype';
import UserRoletype from '../models/UserRoletype';
import UserThirdtype from '../models/UserThirdtype';

class UserQuerys {
  // IndexAllByUsername
  async indexAllByUsername(req, res) {
    try {
      const users = await User.findOne({
        where: { username: 'mykael.mello' },
        order: [['id', 'ASC']],
        include: [{
          model: UserPersonal,
          required: false,
          attributes: ['cpf', 'phone', 'country'],
        },
        {
          model: UserPositiontype,
          required: false,
          attributes: ['id', 'position'],
          through: { attributes: ['matSiape', 'start', 'end'], where: { 'end': null } },
        },
        {
          model: UserRoletype,
          required: false,
          attributes: ['id', 'role'],
          through: { attributes: [], where: { } },
        },
        {
          model: UserThirdtype,
          required: false,
          attributes: ['id', 'job'],
          through: { attributes: [], where: { } },
        }],
      }); // retornar só esses 3 atributos
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }

  // IndexAll
  async indexAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'username', 'email'],
        order: [['id', 'ASC']],
        include: [{
          model: UserPersonal,
          required: false,
          attributes: ['cpf', 'phone', 'country'],
        },
        {
          model: UserPositiontype,
          required: false,
          attributes: ['id', 'position'],
          through: { attributes: ['matSiape', 'start', 'end'], where: { 'end': null } },
        },
        {
          model: UserRoletype,
          required: false,
          attributes: ['id', 'role'],
          through: { attributes: [], where: { } },
        },
        {
          model: UserThirdtype,
          required: false,
          attributes: ['id', 'job'],
          through: { attributes: [], where: { } },
        }],
      }); // retornar só esses 3 atributos
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }

  // ADICIONANDO A REQUISIÇÃO COM OS ROLE, POSITIONS AND THIRDS DITA

  async indexAllId(req, res) {
    try {
      const result = await User.findAll(
        {
          include: [UserRole, UserPosition, UserThird],
        },
      );

      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async storeAllId(req, res) {
    try {
      const result = await User.create(
        req.body,
        {
          include: [UserRole, UserPosition, UserThird],
        },
      );

      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new UserQuerys();
