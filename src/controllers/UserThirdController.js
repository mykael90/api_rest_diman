import UserThird from '../models/UserThird';
import UserThirdtype from '../models/UserThirdtype';
import User from '../models/User';

class UserThirdController {
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

      const third = await UserThirdtype.findByPk(req.body.userThirdtypeId);

      // VERIFICA SE POSTO EXISTE
      if (!third) {
        return res.status(400).json({
          errors: ['ID de posto não existe'],
        });
      }

      await user.addUserThirdtype(third, {
        through: {
          contract: req.body.contract,
          start: req.body.start,
        },
      });

      const result = await UserThird.findOne({
        where: {
          UserId: req.body.userId,
          UserThirdtypeId: req.body.userThirdtypeId,
        },
      });
      const {
        UserId, UserThirdtypeId, contract,
      } = result;
      return res.json({
        UserId, UserThirdtypeId, contract,
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
      const users_Third = await UserThird.findAll({
        attributes: ['user_id', 'user_thirdtype_id', 'contract', 'start', 'end'],
      });
      return res.json(users_Third);
    } catch (e) {
      return res.json(e);
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const contrato = await UserThird.findOne({
        where: {
          UserId: req.body.userId,
          UserThirdtypeId: req.body.userThirdtypeId,
        },
      });

      if (!contrato) {
        return res.status(400).json({
          errors: ['Contrato não existe'],
        });
      }
      await contrato.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserThirdController();
