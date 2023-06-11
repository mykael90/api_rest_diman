import Sequelize, { Op } from 'sequelize';
import qs from 'qs';

import Material from '../models/Material';
import MaterialOut from '../models/MaterialOut';
import MaterialOutItem from '../models/MaterialOutItem';

class MaterialOutItemController {
  async index(req, res) {
    try {
      const result = await MaterialOutItem.findAll({
        group: ['material_id'],
        order: Sequelize.literal('name'),
        required: false,
        include: {
          model: Material,
          attributes: [],
          required: false,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Relação de material
  async indexMaterialWorker(req, res) {
    try {
      let firstDay;
      let lastDay;

      const queryParams =
        Object.keys(req.query).length === 0 ? false : qs.parse(req.query);

      if (queryParams) {
        const startDate = queryParams.startDate?.split('-');
        const endDate = queryParams.endDate?.split('-');

        firstDay = new Date(
          startDate[0],
          Number(startDate[1]) - 1,
          startDate[2]
        );

        firstDay.setUTCHours(0, 0, 0, 0);

        lastDay = new Date(endDate[0], Number(endDate[1]) - 1, endDate[2]);

        lastDay.setUTCHours(23, 59, 59, 999);
      }

      const result = await Material.findAll({
        order: Sequelize.literal('name'),
        include: {
          model: MaterialOutItem,
          required: true,
          include: {
            model: MaterialOut,
            attributes: ['workerId'],
            required: true,
            where: {
              [Op.and]: [
                { material_outtype_id: 1 },
                { worker_id: { [Op.not]: null } },
                queryParams
                  ? {
                      created_at: {
                        [Op.lte]: lastDay,
                        [Op.gte]: firstDay,
                      },
                    }
                  : {},
              ],
            },
          },
        },
      });

      result.forEach((material, index) => {
        // show differents workers for each material
        const workersList = material.MaterialOutItems.map((item) => ({
          WorkerId: item.dataValues.MaterialOut.workerId,
        }));

        material.dataValues.Workers = workersList.reduce((acc, current) => {
          const x = acc.find((item) => item.WorkerId === current.WorkerId);
          if (!x) {
            return acc.concat([current]);
          }
          return acc;
        }, []);
      });

      result.forEach((material) => {
        material.dataValues.Workers.forEach((worker) => {
          worker.materialsOutItems = material.MaterialOutItems.filter(
            (item) => item.MaterialOut.workerId === worker.WorkerId
          );
        });
      });

      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialOutItemController();
