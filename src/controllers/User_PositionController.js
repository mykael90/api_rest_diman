import UserPosition from '../models/UserPosition';
import UserPositiontype from '../models/UserPositiontype';
import User from '../models/User';

class User_PositionController {
  async store(req, res) {
    try {
      console.log(req.body);
      const user = await User.findByPk(req.body.userId); // fazer verificação se existe usuario
      const position = await UserPositiontype.findByPk(req.body.userPositiontypeId); // fazer verificação se existe cargo

      // fazer verificação se esse usuario e cargo ja estao cadastrados na tabela users_positions

      console.log(position);
      await user.addUserPositiontype(position, { through: { matSiape: req.body.matSiape } });
      const result = await UserPosition.findOne({
        where: {
          userId: req.body.userId,
          userPositiontypeId: req.body.userPositiontypeId,
        },
      });
      console.log(result);
      const {
        userId, userPositiontypeId, matSiape,
      } = result;
      return res.json({
        userId, userPositiontypeId, matSiape,
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
      const users_Position = await UserPosition.findAll({ attributes: ['user_id', 'user_positiontype_id', 'mat_siape'] }); // retornar só esses 3 atributos
      return res.json(users_Position);
    } catch (e) {
      return res.json(e);
    }
  }

  // Show
  async show(req, res) {
    try {
      console.log(req.body);

      const user_position = await UserPosition.findOne({
        where: {
          user_id: req.body.userId,
          positionId: req.body.positionId,
        },
      });
      const {
        user_id, positionId, mat_siape,
      } = user_position;
      return res.json({
        user_id, positionId, mat_siape,
      });
    } catch (e) {
      return res.json(null);
    }
  }

  // Update

  async update(req, res) {
    try {
      if (!req.body.userId && !req.body.positionId) { // verificação se id foi enviado
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user_position = await UserPosition.findOne({
        where: {
          user_id: req.body.userId,
          positionId: req.body.positionId,
        },
      });

      if (!user_position) {
        return res.status(400).json({
          errors: ['ID não existe'],
        });
      }
      const newData = await user_position.update(req.body);
      const {
        user_id, positionId, mat_siape,
      } = newData;
      return res.json({
        user_id, positionId, mat_siape,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User_Position.findOne({
        where: {
          user_id: req.body.userId,
          positionId: req.body.positionId,
        },
      });

      if (!user) {
        return res.status(400).json({
          errors: ['ID não existe'],
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

export default new User_PositionController();
