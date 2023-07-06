// import User from '../models/User';

import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserPersonal from '../models/UserPersonal';
import UserPositiontype from '../models/UserPositiontype';
import UserRoletype from '../models/UserRoletype';
import UserThirdtype from '../models/UserThirdtype';

class TokenController {
  async store(req, res) {
    try {
      const { username = '', password = '' } = req.body;

      if (!username || !password) {
        return res.status('401').json({
          errors: ['Credenciais inválidas'],
        });
      }

      const user = await User.findOne({
        where: { username },
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
      });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      if (!user.UserPositiontypes.length && !user.UserThirdtypes.length) {
        return res.status(401).json({
          errors: [`${user.name} não possui vínculo ativo no SISMAN, consulte o administrador.`],
        });
      }

      const {
        id, email, UserRoletypes: roles, UserPositiontypes: positions, UserThirdtypes: jobs,
      } = user;

      const token = jwt.sign(
        {
          id,
          username,
          email,
          roles,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION },
      );

      return res.json({
        token,
        user: {
          name: user.name,
          id,
          username,
          email,
          roles,
          positions,
          jobs,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new TokenController();
