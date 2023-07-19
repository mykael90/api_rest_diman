import Sequelize, { Op } from 'sequelize';
import qs from 'qs';

import Material from '../models/Material';
import MaterialIn from '../models/MaterialIn';
import MaterialInItem from '../models/MaterialInItem';

import MaterialOut from '../models/MaterialOut';

class MaterialInItemController {
  async index(req, res) {
    try {
      const result = await MaterialInItem.findAll({
        attributes: [
          'material_id',
          [Sequelize.literal('name'), 'name'],
          [Sequelize.literal('specification'), 'specification'],
          [Sequelize.literal('unit'), 'unit'],
          [Sequelize.fn('sum', Sequelize.col('quantity')), 'total'],
        ],
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

      const queryParams = Object.keys(req.query).length === 0 ? false : qs.parse(req.query);

      if (queryParams) {
        const startDate = queryParams.startDate?.split('-');
        const endDate = queryParams.endDate?.split('-');

        firstDay = new Date(
          startDate[0],
          Number(startDate[1]) - 1,
          startDate[2],
        );

        firstDay.setHours(0, 0, 0, 0);

        lastDay = new Date(endDate[0], Number(endDate[1]) - 1, endDate[2]);

        lastDay.setHours(23, 59, 59, 999);
      }

      const result = await Material.findAll({
        order: Sequelize.literal('name'),
        include: {
          model: MaterialInItem,
          required: true,
          include: {
            model: MaterialIn,

            required: true,
            include: {
              model: MaterialOut,
              as: 'MaterialReturned',
              attributes: ['workerId'],
              required: true,
              where: { worker_id: { [Op.not]: null } },
            },
            where: {
              [Op.and]: [
                { material_intype_id: 3 },
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
        const workersList = material.MaterialInItems.map((item) => ({
          WorkerId: item.dataValues.MaterialIn.MaterialReturned.workerId,
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
          worker.materialsInItems = material.MaterialInItems.filter(
            (item) => item.MaterialIn.MaterialReturned.workerId === worker.WorkerId,
          );
        });
      });

      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialInItemController();
