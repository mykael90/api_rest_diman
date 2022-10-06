import Sequelize, { QueryTypes } from 'sequelize';

import MaterialInventory from '../models/MaterialInventory';

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
}

export default new ManualController();
