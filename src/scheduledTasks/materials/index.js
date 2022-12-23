/* eslint-disable no-restricted-syntax */
import Sequelize, { Op } from 'sequelize';
import schedule from 'node-schedule';
import axios from 'axios';
import MaterialOut from '../../models/MaterialOut';
import BuildingSipac from '../../models/BuildingSipac';

async function getData() {
  try {
    const result = await MaterialOut.findAll({
      attributes: ['id', 'reqMaintenance', 'propertyId', 'buildingId'],
      where: {
        [Op.and]: [
          { reqMaintenance: { [Op.not]: null } },
          { propertyId: { [Op.is]: null } },
          Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), new Date().toISOString().split('T')[0]),
        ],
      },
      limit: 15,
    });
    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getDataSipac(requisicoes) {
  try {
    const response = await axios.post(
      `${process.env.BASE_AXIOS_SIPAC}/reqmaintenance`,
      requisicoes,
    );
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function updateData(info, requests) {
  for (const obj of info) {
    // inserir codigo para colocar o id da requisição em cada retorno sipac
    obj.id = requests.find((value) => value.reqMaintenance === obj.dadosJSON['Requisição']).id;

    try {
      // console.log(JSON.stringify(obj));
      // console.log('---------------------------------');

      const { id } = obj;

      if (!id) continue; // se o id é nulo, não veio achou no SIPAC, então pula para a próxima requisição;

      // console.log(JSON.stringify(obj.buildingsJSON[0]));

      // eslint-disable-next-line no-await-in-loop
      const building = await BuildingSipac.findOne({
        where: {
          name: obj.buildingsJSON[0]['Prédio'],
        },
      });

      // console.log(building);

      if (!building) continue; // prédio não localizado no banco, pula para o próximo

      const update = {
        buildingId: building.id,
        propertyId: building.propertySipacId,
      };

      const result = await MaterialOut.update(update, {
        where: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default async function index() {
  // roda o script de 19hs, e depois de 20hs
  const job = await schedule.scheduleJob('07 16,20 * * *', async () => {
    try {
      const result = await getData();
      const sipac = await getDataSipac({ requisicoes: result.map((item) => item.reqMaintenance) });
      // inserir codigo para colocar o id da requisição em cada retorno sipac
      await updateData(sipac.data.info, result);
    } catch (e) {
      console.log(e);
      return e;
    }
  });
  console.log('Automated import property and building for materials output on scheduledTasks', job.name);
}

// async function test() {
//   const result = await getData();
//   console.log(result);
//   const sipac = await getDataSipac({ requisicoes: result.map((item) => item.reqMaintenance) });
//   // inserir codigo para colocar o id da requisição em cada retorno sipac
//   await updateData(sipac.data.info, result);
// }

// test();
