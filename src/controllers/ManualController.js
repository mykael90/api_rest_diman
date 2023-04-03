import Sequelize, { QueryTypes } from 'sequelize';

import MaterialInventory from '../models/MaterialInventory';
import PropertySipac from '../models/PropertySipac';
import BuildingSipac from '../models/BuildingSipac';

// import items from '../database/JSON/buildings_central_details.json';

const data = [];

class ManualController {
  // Update

  async update(req, res) {
    data.forEach(async (item) => {
      try {
        const itemUpdated = await MaterialInventory.update(
          {
            initialValue: item.value,
          },
          { where: { materialId: item.id } },
        );
        return console.log(JSON.stringify(itemUpdated));
      } catch (e) {
        return console.log(JSON.stringify(e));
      }
    });
    return res.json('FUNCIONOU');
  }

  // async updateBulding2(req, res) {
  //   const updateZone = async (item) => {
  //     try {
  //       await BuildingSipac.update({
  //         zone: item.zone, area: item.area.replace(',', '.'), floors: item.floors, num_infra: item.num_infra,
  //       }, {
  //         where: {
  //           'id': item.id,
  //           'property_sipac_id': item.property_sipac_id,
  //         },
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   for (const item of items) {
  //     try {
  //       await updateZone(item);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   return res.json('OK');
  // }
}

export default new ManualController();
