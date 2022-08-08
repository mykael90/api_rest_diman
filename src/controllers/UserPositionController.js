import UserPosition from '../models/UserPosition';
import UserPositiontype from '../models/UserPositiontype';
import User from '../models/User';

class UserPositionController {
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

      const position = await UserPositiontype.findByPk(req.body.userPositiontypeId);

      // VERIFICA SE CARGO EXISTE
      if (!position) {
        return res.status(400).json({
          errors: ['ID de papel não existe'],
        });
      }

      // fazer verificação se esse usuario e cargo ja estao cadastrados na tabela users_positions
      // necessário?

      await user.addUserPositiontype(position, { through: { matSiape: req.body.matSiape } });
      const result = await UserPosition.findOne({
        where: {
          UserId: req.body.userId,
          UserPositiontypeId: req.body.userPositiontypeId,
        },
      });
      const {
        UserId, UserPositiontypeId, matSiape,
      } = result;
      return res.json({
        UserId, UserPositiontypeId, matSiape,
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
      const users_Position = await UserPosition.findAll({
        attributes: ['user_id', 'user_positiontype_id', 'mat_siape', 'start', 'end'],
      });
      return res.json(users_Position);
    } catch (e) {
      return res.json(e);
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const contrato = await UserPosition.findOne({
        where: {
          UserId: req.body.userId,
          UserPositiontypeId: req.body.userPositiontypeId,
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

export default new UserPositionController();
