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
import MaterialInFile from '../models/MaterialInFile';
import MaterialOuttype from '../models/MaterialOuttype';
import MaterialOutDiscardtype from '../models/MaterialOutDiscardtype';
import MaterialOut from '../models/MaterialOut';
import MaterialOutItem from '../models/MaterialOutItem';
import MaterialOutFile from '../models/MaterialOutFile';
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
import WorkerJobtype from '../models/WorkerJobtype';
import WorkerContractDanger from '../models/WorkerContractDanger';
import WorkerContractRegime from '../models/WorkerContractRegime';
import WorkerContractUnhealthy from '../models/WorkerContractUnhealthy';

import WorkerTaskRisktype from '../models/WorkerTaskRisktype';
import WorkerTasktype from '../models/WorkerTasktype';
import WorkerTaskStatustype from '../models/WorkerTaskStatustype';
import WorkerTask from '../models/WorkerTask';
import WorkerTaskStatus from '../models/WorkerTaskStatus';
import WorkerTaskStatusPhoto from '../models/WorkerTaskStatusPhoto';
import WorkerTaskRisk from '../models/WorkerTaskRisk';
import WorkerTaskItem from '../models/WorkerTaskItem';
import WorkerTaskServant from '../models/WorkerTaskServant';

import WorkerManualfrequency from '../models/WorkerManualfrequency';
import WorkerManualfrequencytype from '../models/WorkerManualfrequencytype';
import WorkerManualfrequencyItem from '../models/WorkerManualfrequencyItem';

import Contract from '../models/Contract';
import Provider from '../models/Provider';

import ContractValidy from '../models/ContractValidy';
import ContractValidyItem from '../models/ContractValidyItem';
import ContractValidytype from '../models/ContractValidytype';
import ContractUnidade from '../models/ContractUnidade';
import Address from '../models/Address';
import WorkerAddress from '../models/WorkerAddress';

import BuildingSipac from '../models/BuildingSipac';
import PropertySipac from '../models/PropertySipac';
import BuildingSection from '../models/BuildingSection';
import BuildingSectiontype from '../models/BuildingSectiontype';

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
  MaterialInFile,
  MaterialOuttype,
  MaterialOutDiscardtype,
  MaterialOut,
  MaterialOutItem,
  MaterialOutFile,
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
  WorkerContractDanger,
  WorkerContractRegime,
  WorkerContractUnhealthy,
  Provider,
  Contract,
  ContractValidy,
  ContractValidyItem,
  ContractValidytype,
  ContractUnidade,
  Address,
  WorkerAddress,
  Worker,
  PropertySipac,
  BuildingSipac,
  BuildingSectiontype,
  BuildingSection,
  WorkerTaskRisktype,
  WorkerTasktype,
  WorkerTaskStatustype,
  WorkerTask,
  WorkerTaskStatus,
  WorkerTaskStatusPhoto,
  WorkerTaskRisk,
  WorkerTaskItem,
  WorkerTaskServant,
  WorkerManualfrequency,
  WorkerManualfrequencytype,
  WorkerManualfrequencyItem,
];

const connection = new Sequelize(databaseConfig[env]);

models.forEach((model) => model.init(connection));

models.forEach(
  (model) => model.associate && model.associate(connection.models),
);

// CUSTOMIZED FUNCTIONS SEQUELIZE
// (simplifica as consultas, para não ter que repetir todas essas funções nos controllers)

Sequelize.currencyBr = (column) => Sequelize.fn(
  'CONCAT',
  Sequelize.literal("'R$ '"),
  Sequelize.fn('FORMAT', Sequelize.col(column), '2', 'pt_BR'),
);

Sequelize.dataBr = (column) => Sequelize.fn('date_format', Sequelize.col(column), '%d/%m/%Y');
Sequelize.dataHoraBr = (column) => Sequelize.fn('date_format', Sequelize.col(column), '%d/%m/%Y %H:%i');

export default connection;
