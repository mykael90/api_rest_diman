import UserPersonal from '../models/UserPersonal';
import User from '../models/User';

class UserPersonalController {
  async store(req, res) {
    try {
      console.log(req.body);
      const user = await User.findByPk(req.body.userId);

      // VERIFICA SE USUÁRIO EXISTE
      if (!user) {
        return res.status(400).json({
          errors: ['ID de usuário não existe'],
        });
      }

      const result = await user.createUserPersonal({
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        country: req.body.country,
      });
      const {
        UserId, birthdate, phone, country,
      } = result;
      return res.json({
        UserId, birthdate, phone, country,
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
      const users_Personal = await UserPersonal.findAll({
        attributes: ['user_id', 'birthdate', 'phone', 'country', 'created_at'],
      });
      return res.json(users_Personal);
    } catch (e) {
      return res.json(e);
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await UserPersonal.findOne({
        where: {
          user_id: req.body.userId,
        },
      });

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserPersonalController();
