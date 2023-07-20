import Sequelize, { Op } from 'sequelize';
import qs from 'qs';

import { extname } from 'path';

import Material from '../models/Material';

import MaterialOut from '../models/MaterialOut';
import MaterialOutItem from '../models/MaterialOutItem';

import MaterialIn from '../models/MaterialIn';
import MaterialInItem from '../models/MaterialInItem';

import Worker from '../models/Worker';
import WorkerContract from '../models/WorkerContract';

class MaterialController {
  // Index

  async index(req, res) {
    try {
      const result = await Material.findAll({
        attributes: [
          'id',
          'id_catmat',
          'name',
          'unit',
          'specification',
          'group_sipac',
          'filename_photo',
        ],
        order: [['id', 'ASC']],
        where: {
          is_inactive: false,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Store Temporary
  async storeTemporary(req, res, next) {
    try {
      const index = Number(
        await Material.count({
          where: {
            id: {
              [Op.like]: '9999%',
            },
          },
          col: 'id',
        }),
      );

      // custom id entry
      req.body.id = `9999${(index + 1).toString().padStart(4, '0')}`;
      req.body.groupSipac = '9999';
      const material = await Material.create(req.body);
      if (!req.file) return res.json(material);

      // If has file --->
      req.result = { ...material.dataValues };
      req.dimensionResized = 600; // new dimension to photo
      const fileExtension = extname(req.file.originalname);
      req.fileName = `${Material.name.toLowerCase()}_${
        req.result.id
      }${fileExtension}`;
      // update filename field on database
      await Material.update(
        { filenamePhoto: req.fileName },
        {
          where: {
            id: req.result.id,
          },
        },
      );
      return next(); // go to uploadController
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Store Sipac
  async storeSipac(req, res) {
    try {
      const material = await Material.create(req.body);
      return res.json(material);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const material = await Material.findByPk(req.params.id);
      return res.json(material);
    } catch (e) {
      return res.json(null);
    }
  }

  // Worker by Material
  async indexWorkerByMaterial(req, res) {
    try {
      let firstDay;
      let lastDay;

      const queryParams = Object.keys(req.query).length === 0 ? false : qs.parse(req.query);

      console.log(queryParams.id);

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
        attributes: ['id', 'name', 'unit', 'specification', 'group_sipac'],
        order: Sequelize.literal('name'),
        where: {
          id: {
            [Op.in]: queryParams.id ? queryParams.id : [],
          },
        },
        include: [
          {
            model: MaterialOutItem,
            required: true,
            include: {
              model: MaterialOut,
              include: {
                model: Worker,
                attributes: ['name'],
              },
              attributes: ['workerId', 'reqMaintenance', 'created_at', 'place'],
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
          {
            model: MaterialInItem,
            // required: true,
            include: {
              model: MaterialIn,
              attributes: ['MaterialIntypeId', 'reqMaintenance', 'created_at'],
              required: true,
              include: {
                model: MaterialOut,
                as: 'MaterialReturned',
                attributes: ['workerId', 'place'],
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
        ],
      });

      // result.forEach((material, index) => {
      //   // show differents workers for each material
      //   const workersList = material.MaterialOutItems.map((item) => ({
      //     WorkerId: item.dataValues.MaterialOut.workerId,
      //     name: item.dataValues.MaterialOut.Worker.name,
      //   }));

      //   material.dataValues.Workers = workersList.reduce((acc, current) => {
      //     const x = acc.find((item) => item.WorkerId === current.WorkerId);
      //     if (!x) {
      //       return acc.concat([current]);
      //     }
      //     return acc;
      //   }, []);
      // });

      // result.forEach((material) => {
      //   material.dataValues.Workers.forEach((worker) => {
      //     worker.materialsOutItems = material.MaterialOutItems.filter(
      //       (item) => item.MaterialOut.workerId === worker.WorkerId
      //     );

      //     worker.materialsInItems = material.MaterialInItems.filter(
      //       (item) =>
      //         item.MaterialIn.MaterialReturned.workerId === worker.WorkerId
      //     );
      //   });
      // });

      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Material by Worker
  async indexMaterialByWorker(req, res) {
    try {
      let firstDay;
      let lastDay;

      const queryParams = Object.keys(req.query).length === 0 ? false : qs.parse(req.query);

      console.log(queryParams);

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

      const result = await Worker.findAll({
        attributes: ['id', 'name'],
        where: {
          id: {
            [Op.in]: queryParams.id ? queryParams.id : [],
          },
        },
        include: [
          {
            model: WorkerContract,
            attributes: ['WorkerJobtypeId'],
            order: [['start', 'DESC']],
          },
          {

            model: MaterialOut,
            attributes: ['id'],
            // attributes: { include: ['workerId', 'reqMaintenance', 'created_at', 'place'] },
            include: [{
              model: MaterialOutItem,
              attributes: {
                include: [
                  [Sequelize.literal('`MaterialOuts->MaterialOutItems->Material`.`name`'), 'name'],
                  [Sequelize.literal('`MaterialOuts->MaterialOutItems->Material`.`unit`'), 'unit'],
                ],
              },
              include: [{ model: Material, attributes: [] }, {
                model: MaterialOut,
                attributes: ['reqMaintenance', 'created_at', 'place'],
              }],
            },
            {

              model: MaterialIn,
              as: 'MaterialReturned',
              required: false,
              attributes: ['id'],
              // attributes: { include: ['workerId', 'reqMaintenance', 'created_at', 'place'] },
              include: {
                model: MaterialInItem,
                // attributes: {
                //   include: [
                //     [Sequelize.literal('`MaterialIns->MaterialInItems->Material`.`name`'), 'name'],
                //     [Sequelize.literal('`MaterialIns->MaterialInItems->Material`.`unit`'), 'unit'],
                //   ],
                // },
              },
              where: {
                [Op.and]: [
                  { material_intype_id: 3 },
                  // { worker_id: { [Op.not]: null } },
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

            }],
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

          // {
          //   model: MaterialInItem,
          //   // required: true,
          //   include: {
          //     model: MaterialIn,
          //     attributes: ['MaterialIntypeId', 'reqMaintenance', 'created_at'],
          //     required: true,
          //     include: {
          //       model: MaterialOut,
          //       as: 'MaterialReturned',
          //       attributes: ['workerId', 'place'],
          //       required: true,
          //       where: { worker_id: { [Op.not]: null } },
          //     },
          //     where: {
          //       [Op.and]: [
          //         { material_intype_id: 3 },
          //         queryParams
          //           ? {
          //             created_at: {
          //               [Op.lte]: lastDay,
          //               [Op.gte]: firstDay,
          //             },
          //           }
          //           : {},
          //       ],
          //     },
          //   },
          // },
        ],
        order: [['name', 'ASC']],
      });

      result.forEach((worker, index) => {
        // show differents materials for each worker
        const materialsOutList = [];
        const materialsReturnedList = [];

        worker.MaterialOuts.forEach((materialOut) => {
          // console.log(materialOut);
          materialsOutList.push(materialOut.dataValues.MaterialOutItems.map((item) => ({
            id: item.dataValues.MaterialId,
            name: item.dataValues.name,
            quantity: item.dataValues.quantity,
            unit: item.dataValues.unit,
            value: item.dataValues.value,
            total: Number((item.dataValues.quantity * item.dataValues.value).toFixed(2)),
            MaterialOut: item.MaterialOut,
          })));

          if (materialOut.dataValues.MaterialReturned.length) {
            materialsReturnedList.push(materialOut.dataValues.MaterialReturned.map((returned) => (
              returned.MaterialInItems.map((item) => ({
                id: item.dataValues.MaterialId,
                quantity: item.dataValues.quantity,
                value: item.dataValues.value,
                total: Number((item.dataValues.quantity * item.dataValues.value).toFixed(2)),
              }))
            )));
          }
        });

        const materialsOutListFlat = materialsOutList.flat();
        const materialsReturnedListFlat = materialsReturnedList.flat().flat();

        const materialsOutListObjects = materialsOutListFlat.reduce((acc, current) => {
          const i = acc.findIndex((item) => item.id === current.id);
          if (i === -1) {
            return acc.concat([{
              id: current.id, name: current.name, qtdOut: current.quantity, totalOut: current.total, MaterialOutItems: [current],
            }]);
          }
          acc[i].qtdOut += current.quantity;
          acc[i].totalOut += current.total;
          acc[i].MaterialOutItems.push(current);
          return acc;
        }, []);

        const materialsReturnedListObjects = materialsReturnedListFlat.reduce((acc, current) => {
          const i = acc.findIndex((item) => item.id === current.id);
          if (i === -1) {
            return acc.concat([{
              id: current.id, qtdReturned: current.quantity, totalReturned: current.total, MaterialReturnedItems: [current],
            }]);
          }
          acc[i].qtdReturned += current.quantity;
          acc[i].totalReturned += current.total;
          acc[i].MaterialReturnedItems.push(current);
          return acc;
        }, []);

        const mergedArray = materialsOutListObjects.map((obj1) => {
          const matchingObj = materialsReturnedListObjects.find((obj2) => obj2.id === obj1.id);
          return { ...obj1, ...matchingObj };
        });

        worker.dataValues.Materials = mergedArray;

        // delete worker.dataValues.MaterialOuts;
      });

      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
}

export default new MaterialController();
