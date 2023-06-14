/* eslint-disable no-restricted-syntax */
import Sequelize, { Op } from 'sequelize';
import schedule from 'node-schedule';
import MaterialReserve from '../../models/MaterialReserve';

async function updateData() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);

  const dataToUpdate = { canceledAt: today };

  try {
    const result = await MaterialReserve.update(dataToUpdate, {
      where: {
        [Op.and]: [
          { withdrawnAt: { [Op.is]: null } },
          { canceledAt: { [Op.is]: null } },
          {
            createddAt: {
              [Op.lt]: fiveDaysAgo,
            },
          },
        ],
      },
    });
    return result;
  } catch (e) {
    return console.log(e);
  }
}

export default async function index() {
  // roda o script de 19hs, e depois de 20hs
  const job = schedule.scheduleJob('59 23 * * * *', async () => {
    try {
      return await updateData();
    } catch (e) {
      console.log(e);
      return e;
    }
  });
  console.log('Automated update materials reserves', job.name);
}

// async function test() {
//   const result = await getData();
//   console.log(result);
//   const sipac = await getDataSipac({ requisicoes: result.map((item) => item.reqMaintenance) });
//   // inserir codigo para colocar o id da requisição em cada retorno sipac
//   await updateData(sipac.data.info, result);
// }

// test();
