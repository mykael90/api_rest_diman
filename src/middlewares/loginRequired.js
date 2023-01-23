import jwt from 'jsonwebtoken'; // quando importa jwt já vem o dotenv de lá
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  // console.log(req);

  if (!authorization) {
    return res.status(401).json({
      errors: ['Usuário não logado, autenticação necessária'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(dados);
    const { id, email, roles } = dados;

    console.log(roles);

    const user = await User.findOne({
      where: {
        id, email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Token expirado ou inválido'],
      });
    }

    req.userId = id;
    req.UserEmail = email;
    return next();
  } catch (e) {
    console.log(JSON.stringify(e));

    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({
        errors: ['Token expirado, realize o login novamente.'],
      });
    } return res.status(401).json({
      errors: [e.message],
    });
  }
};
