import Sequelize, { QueryTypes } from 'sequelize';

import MaterialInventory from '../models/MaterialInventory';
import PropertySipac from '../models/PropertySipac';
import BuildingSipac from '../models/BuildingSipac';

// import items1 from '../database/JSON/buildings_external.json';
// import items2 from '../database/JSON/buildings_central_details.json';

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
  //       await BuildingSipac.update(
  //         {
  //           // zone: item.zone,
  //           // area: Number.isNaN(Number(item.area.replace(',', '.')))
  //           //   ? null
  //           //   : Number(item.area.replace(',', '.')),
  //           // floors: Number.isNaN(parseInt(item.floors, 10))
  //           //   ? null
  //           //   : parseInt(item.floors, 10),
  //           numInfra: item.num_infra,
  //           subRip: item.sub_rip,
  //         },
  //         {
  //           where: {
  //             id: item.id,
  //             property_sipac_id: item.property_sipac_id,
  //           },
  //         },
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   for (const item of items1) {
  //     try {
  //       await updateZone(item);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   return res.json('OK');
  // }

  // async updateBulding3(req, res) {
  //   const updateZone = async (item) => {
  //     try {
  //       await BuildingSipac.update(
  //         {
  //           zone: item.zone,
  //           area: Number.isNaN(Number(item.area.replace(',', '.')))
  //             ? null
  //             : Number(item.area.replace(',', '.')),
  //           floors: Number.isNaN(parseInt(item.floors, 10))
  //             ? null
  //             : parseInt(item.floors, 10),
  //           numInfra: item.num_infra,
  //           subRip: item.sub_rip,
  //         },
  //         {
  //           where: {
  //             id: item.id,
  //             property_sipac_id: item.property_sipac_id,
  //           },
  //         },
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   for (const item of items2) {
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
