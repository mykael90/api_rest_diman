import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import UserPosition from '../models/UserPosition';
import UserPositiontype from '../models/UserPositiontype';
import Foto from '../models/Foto';

const models = [Aluno, User, UserPositiontype, UserPosition, Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
