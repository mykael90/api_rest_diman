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
import MaterialOuttype from '../models/MaterialOuttype';
import MaterialOut from '../models/MaterialOut';
import MaterialOutItem from '../models/MaterialOutItem';
import MaterialInventory from '../models/MaterialInventory';
import MaterialRestrict from '../models/MaterialRestrict';
import MaterialRestrictItem from '../models/MaterialRestrictItem';
import MaterialRelease from '../models/MaterialRelease';
import MaterialReleaseItem from '../models/MaterialReleaseItem';
import MaterialReserve from '../models/MaterialReserve';
import MaterialReserveItem from '../models/MaterialReserveItem';

import Unidade from '../models/Unidade';
import Worker from '../models/Worker';
import Contacttype from '../models/Contacttype';
import WorkerContact from '../models/WorkerContact';
import WorkerContract from '../models/WorkerContract';
import Contract from '../models/Contract';
import Provider from '../models/Provider';
import WorkerJobtype from '../models/WorkerJobtype';
import ContractValidy from '../models/ContractValidy';
import ContractValidyItems from '../models/ContractValidyItems';
import ContractValidytype from '../models/ContractValidytype';

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
  MaterialOuttype,
  MaterialOut,
  MaterialOutItem,
  MaterialRestrict,
  MaterialRestrictItem,
  MaterialRelease,
  MaterialReleaseItem,
  MaterialReserve,
  MaterialReserveItem,
  MaterialInventory,
  Unidade,
  Contacttype,
  WorkerContact,
  WorkerContract,
  WorkerJobtype,
  Provider,
  Contract,
  ContractValidy,
  ContractValidyItems,
  ContractValidytype,
  Worker,
];

const connection = new Sequelize(databaseConfig[env]);

models.forEach((model) => model.init(connection));

models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

export default connection;
