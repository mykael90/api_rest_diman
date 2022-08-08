import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import UserPosition from '../models/UserPosition';
import UserPositiontype from '../models/UserPositiontype';
import UserRole from '../models/UserRole';
import UserRoletype from '../models/UserRoletype';
import Foto from '../models/Foto';

const models = [
  Aluno,
  User,
  UserPositiontype,
  UserPosition,
  UserRoletype,
  UserRole,
  Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
