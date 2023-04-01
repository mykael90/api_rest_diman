import Sequelize, { QueryTypes } from 'sequelize';

import MaterialInventory from '../models/MaterialInventory';
import PropertySipac from '../models/PropertySipac';
import BuildingSipac from '../models/BuildingSipac';

import items from '../database/JSON/zones.json';

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

  async updateBulding(req, res) {
    try {
      for (const item of items) {
        const building = await BuildingSipac.findOne({
          attributes: {
            include: [
              [
                Sequelize.fn(
                  'CONCAT',
                  Sequelize.literal('`PropertySipac`.`rip`'),
                  '-',
                  Sequelize.fn(
                    'LPAD',
                    Sequelize.col('`BuildingSipac`.`id`'),
                    3,
                    '0',
                  ),
                ),
                'sub-rip',
              ],
            ],
          },
          include: [
            {
              model: PropertySipac,
              required: false,
              attributes: [],
            },
          ],

          // where: Sequelize.where(
          //   Sequelize.fn(
          //     'CONCAT',
          //     Sequelize.literal('`PropertySipac`.`rip`'),
          //     '-',
          //     Sequelize.fn(
          //       'LPAD',
          //       Sequelize.col('`BuildingSipac`.`id`'),
          //       3,
          //       '0'
          //     )
          //   ),
          //   item['sub-rip']
          // ),

          where: {
            id: item.id,
            property_sipac_id: item.property_sipac_id,
          },
        });

        building.zone = item.zone;

        await building.save();
      }

      // console.log(JSON.stringify(zones));
      return console.log('FUNCIONOU');
    } catch (e) {
      return res.json({
        errors: [e.message],
      });
    }
  }

  async updateBulding2(req, res) {
    const updateZone = async (item) => {
      try {
        await BuildingSipac.update({ zone: item.zone }, {
          where: {
            'id': item.id,
            'property_sipac_id': item.property_sipac_id,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    for (const item of items) {
      try {
        await updateZone(item);
      } catch (e) {
        console.log(e);
      }
    }
    return res.json('OK');
  }
}

export default new ManualController();
