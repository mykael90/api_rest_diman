import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
import databaseConfig from '../config/database';

import Aluno from '../models/Aluno';

import User from '../models/User';
import UserPosition from '../models/UserPosition';
import UserPositiontype from '../models/UserPositiontype';
import UserThird from '../models/UserThird';
import UserThirdtype from '../models/UserThirdtype';
import UserRole from '../models/UserRole';
import UserRoletype from '../models/UserRoletype';
import UserPhoto from '../models/UserPhoto';
import UserPersonal from '../models/UserPersonal';
import Foto from '../models/Foto';

import Material from '../models/Material';
import MaterialIntype from '../models/MaterialIntype';
import MaterialIn from '../models/MaterialIn';
import MaterialInItem from '../models/MaterialInItem';

import Unidade from '../models/Unidade';
import Worker from '../models/Worker';
import Contacttype from '../models/Contacttype';
import WorkerContact from '../models/WorkerContact';

const models = [
  Aluno,
  User,
  UserPositiontype,
  UserPosition,
  UserThird,
  UserThirdtype,
  UserRoletype,
  UserRole,
  UserPhoto,
  UserPersonal,
  Foto,
  Material,
  MaterialIntype,
  MaterialIn,
  MaterialInItem,
  Unidade,
  Contacttype,
  WorkerContact,
  Worker,
];

const connection = new Sequelize(databaseConfig[env]);

models.forEach((model) => model.init(connection));

models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
