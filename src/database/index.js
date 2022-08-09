import Sequelize from 'sequelize';
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
  Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
