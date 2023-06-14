/* eslint-disable no-restricted-syntax */
import Sequelize, { Op } from 'sequelize';
import schedule from 'node-schedule';
import MaterialReserve from '../../models/MaterialReserve';

async function updateData() {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const dataToUpdate = { canceledAt: today };

  try {
    const result = await MaterialReserve.update(dataToUpdate, {
      where: {
        [Op.and]: [
          { withdrawnAt: { [Op.is]: null } },
          { canceledAt: { [Op.is]: null } },
          {
            created_at: {
              [Op.lt]: sevenDaysAgo,
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

async function test() {
  console.log('updateData');
  await updateData();
}

// test();
