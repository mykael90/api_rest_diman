import UserRole from '../models/UserRole';
import UserRoletype from '../models/UserRoletype';
import User from '../models/User';

class UserRoleController {
  async store(req, res) {
    try {
      const user = await User.findByPk(req.body.userId);

      // VERIFICA SE USUÁRIO EXISTE
      if (!user) {
        return res.status(400).json({
          errors: ['ID de usuário não existe'],
        });
      }

      const role = await UserRoletype.findByPk(req.body.userRoletypeId);

      // VERIFICA SE PAPEL EXISTE
      if (!role) {
        return res.status(400).json({
          errors: ['ID de papel não existe'],
        });
      }

      await user.addUserRoletype(role, { through: { } });
      const result = await UserRole.findOne({
        where: {
          UserId: req.body.userId,
          UserRoletypeId: req.body.userRoletypeId,
        },
      });
      const {
        UserId, UserRoletypeId,
      } = result;
      return res.json({
        UserId, UserRoletypeId,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index

  async index(req, res) {
    try {
      const users_Role = await UserRole.findAll({
        attributes: ['user_id', 'user_roletype_id'],
      });
      return res.json(users_Role);
    } catch (e) {
      return res.json(e);
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const userRole = await UserRole.findOne({
        where: {
          UserId: req.body.userId,
          UserRoletypeId: req.body.userRoletypeId,
        },
      });

      if (!userRole) {
        return res.status(400).json({
          errors: ['Papel não existe'],
        });
      }
      await userRole.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserRoleController();
