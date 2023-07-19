import Sequelize, { Op } from 'sequelize';
import { extname } from 'path';
import qs from 'qs';

import WorkerManualfrequency from '../models/WorkerManualfrequency';
import WorkerManualfrequencytype from '../models/WorkerManualfrequencytype';
import WorkerManualfrequencyItem from '../models/WorkerManualfrequencyItem';
import WorkerContract from '../models/WorkerContract';
import WorkerJobtype from '../models/WorkerJobtype';
import Worker from '../models/Worker';
import User from '../models/User';
import Contract from '../models/Contract';
import Unidade from '../models/Unidade';

class WorkerManualfrequencyController {
  // Index
  async index(req, res) {
    console.log(req.query);
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

      const result = await WorkerManualfrequency.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          Contract,
          Unidade,
          {
            model: WorkerManualfrequencyItem,
            include: [WorkerManualfrequencytype, Worker],
          },
        ],
        where: queryParams
          ? {
            date: {
              [Op.lte]: lastDay,
              [Op.gte]: firstDay,
            },
          }
          : {},
      });
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }

  async show(req, res) {
    try {
      const result = await WorkerManualfrequency.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          Contract,
          Unidade,
          {
            model: WorkerManualfrequencyItem,
            include: [
              WorkerManualfrequencytype,
              {
                model: Worker,
                include: [
                  {
                    model: WorkerContract,
                    include: [WorkerJobtype],
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }

  async store(req, res) {
    try {
      const exist = await WorkerManualfrequency.findAll({
        where: {
          unidade_id: req.body.UnidadeId,
          contract_id: req.body.ContractId,
          date: req.body.date,
        },
        limit: 1,
      });

      // VERIFICA SE FREQUÊNCIA JÁ EXISTE
      if (exist.length) {
        return res.status(400).json({
          errors: [
            'Registro de ocorrência de ponto já realizado para essa data, empresa e unidade administrativa',
          ],
        });
      }

      const result = await WorkerManualfrequency.create(req.body, {
        include: [WorkerManualfrequencyItem],
      });
      return res.json(result);
    } catch (e) {
      console.log('erroCustomizado', e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new WorkerManualfrequencyController();
