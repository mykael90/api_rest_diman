import Sequelize, { Op } from 'sequelize';
import qs from 'qs';

import { extname } from 'path';
import { random_5 } from '../asset/script/getRandomNumber';

import MaterialIn from '../models/MaterialIn';
import MaterialIntype from '../models/MaterialIntype';
import Material from '../models/Material';
import MaterialInItem from '../models/MaterialInItem';
import User from '../models/User';
import Unidade from '../models/Unidade';

import MaterialRestrict from '../models/MaterialRestrict';
import MaterialRestrictItem from '../models/MaterialRestrictItem';
import MaterialRelease from '../models/MaterialRelease';
import MaterialReleaseItem from '../models/MaterialReleaseItem';
import MaterialInFile from '../models/MaterialInFile';

import removeAccent from '../asset/script/removeAccent';

class MaterialInController {
  async store(req, res) {
    try {
      const exists = await MaterialIn.findOne({ where: { req: req.body.req } });

      // VERIFICAR SE ESSA REQUISIÇÃO JÁ FOI RECEBIDA
      if (exists) {
        return res.status(406).json({
          errors: [
            `Recebimento não realizado, requisição ${req.body.req} já cadastrada no banco de dados`,
          ],
        });
      }

      // VERIFICAR SE JÁ TEM OS MATERIAIS CADASTRADOS NO BANCO,
      // SE NÃO TIVER, CADASTRAR AUTOMATICAMENTE
      const items = await Promise.all(
        req.body.items.map(async (item) => ({
          ...item,
          response: await Material.findByPk(item.MaterialId),
        })),
      );

      items.forEach(async (item) => {
        if (!item.response) {
          await Material.create(
            {
              id: item.MaterialId,
              groupSipac: item.MaterialId.substr(0, 4),
              name: removeAccent(item.name),
              unit: item.unit,
            },
          );
        }
      });

      // ADICIONANDO A REQUISIÇÃO COM OS ITENS PROPRIAMENTE DITA

      const materialIn = await MaterialIn.create(
        {
          materialIntypeId: req.body.materialIntypeId,
          req: req.body.req,
          userId: req.body.userId,
          value: req.body.value,
          requiredBy: req.body.requiredBy,
          reqMaintenance: req.body.reqMaintenance,
          reqUnit: req.body.reqUnit,
          costUnit: req.body.costUnit,
          registerDate: req.body.registerDate,

          MaterialInItems: req.body.items,
        },
        {
          include: [MaterialInItem],
        },
      );
      return res.json(materialIn);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // RETORNOS, DIRETO FORNECEDOR, DOAÇÃO, ETC
  async storeGeneral(req, res, next) {
    try {
      if (req.files) {
        // If has file --->
        req.body.MaterialInFiles = [];

        // POVOANDO O ARRAY DOS ARQUIVOS
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const i in req.files) {
          const fileExtension = extname(req.files[i].originalname);
          req.files[i].newName = `${Date.now()}_${random_5()}${fileExtension}`;
          req.body.MaterialInFiles.push({
            filename: req.files[i].newName,
            originalName: req.files[i].originalname,
            order: Number(i) + 1,
          });
        }
      }

      const materialIn = await MaterialIn.create(
        req.body,
        {
          include: [MaterialInItem, MaterialInFile],
        },
      );

      if (req.files) {
        req.result = materialIn;
        return next(); // go to uploadController
      }

      return res.json(materialIn);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async index1(req, res) {
    try {
      const result = await MaterialIn.findAll(
        {
          include: [MaterialInItem],
        },
      );
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Index

  async index(req, res) {
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

        firstDay.setUTCHours(0, 0, 0, 0);

        lastDay = new Date(endDate[0], Number(endDate[1]) - 1, endDate[2]);

        lastDay.setUTCHours(23, 59, 59, 999);
      }

      const result = await MaterialIn.findAll({
        attributes: [
          'id',
          'materialIntypeId',
          'userId',
          [Sequelize.literal('`MaterialIntype`.`type`'), 'type'],
          [Sequelize.literal('`User`.`username`'), 'receivedBy'],
          'req',
          [Sequelize.currencyBr('`MaterialIn`.`value`'), 'value'],

          'requiredBy',
          'reqMaintenance',
          'reqUnit',
          'costUnit',
          [Sequelize.literal('`Unidade`.`sigla`'), 'costUnitSigla'],
          [Sequelize.literal('`Unidade`.`nome_unidade`'), 'costUnitNome'],
          [Sequelize.dataBr('`MaterialIn`.`register_date`'), 'registerDate'],
          [Sequelize.dataHoraBr(
            '`MaterialIn`.`created_at`',
          ),
          'createdAt',
          ],
          'obs'],
        include: [
          {
            model: MaterialInItem,
            attributes: [
              ['material_id', 'materialId'],
              [Sequelize.literal('`MaterialInItems->Material`.`name`'), 'name'],
              [Sequelize.literal('specification'), 'specification'],
              [Sequelize.literal('unit'), 'unit'],
              'quantity',
              [Sequelize.currencyBr('`MaterialInItems`.`value`'), 'value'],
            ],
            required: false,
            include: {
              model: Material,
              attributes: [],
              required: false,
            },
          },
          {
            model: User,
            attributes: [],
            required: false,
          },
          {
            model: Unidade,
            attributes: [],
            required: false,
          },
          {
            model: MaterialIntype,
            required: false,
          },
          {
            model: MaterialInFile,
            required: false,
          },
        ],
        where: queryParams
          ? {
            created_at: {
              [Op.lte]: lastDay,
              [Op.gte]: firstDay,
            },
          }
          : {},
        order: [
          ['id', 'DESC'],
        ],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Show
  async show(req, res) {
    try {
      const { reqMaintenance, year } = req.params;
      const result = await MaterialIn.findAll({
        attributes: [
          'id',
          'materialIntypeId',
          'userId',
          [Sequelize.literal('`MaterialIntype`.`type`'), 'type'],
          [Sequelize.literal('`User`.`username`'), 'receivedBy'],
          'req',
          [Sequelize.currencyBr('`MaterialIn`.`value`'), 'value'],

          'requiredBy',
          'reqMaintenance',
          'reqUnit',
          'costUnit',
          [Sequelize.literal('`Unidade`.`sigla`'), 'costUnitSigla'],
          [Sequelize.literal('`Unidade`.`nome_unidade`'), 'costUnitNome'],
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialIn`.`register_date`'),
              '%d/%m/%Y',
            ),
            'registerDate',
          ],

          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('`MaterialIn`.`created_At`'),
              '%d/%m/%Y',
            ),
            'createdAt',
          ],
          'obs',
        ],
        where: {
          reqMaintenance: `${reqMaintenance}/${year}`,
        },
        include: [
          {
            model: MaterialInItem,
            attributes: [
              ['material_id', 'materialId'],
              [Sequelize.literal('`MaterialInItems->Material`.`name`'), 'name'],
              [Sequelize.literal('specification'), 'specification'],
              [Sequelize.literal('unit'), 'unit'],
              'quantity',
              [
                Sequelize.fn(
                  'format',
                  Sequelize.col('`MaterialInItems`.`value`'),
                  2,
                  'pt_BR',
                ),
                'value',
              ],
            ],
            required: false,
            include: {
              model: Material,
              attributes: [],
              required: false,
            },
          },
          {
            model: User,
            attributes: [],
            required: false,
          },
          {
            model: Unidade,
            attributes: [],
            required: false,
          },
          {
            model: MaterialIntype,
            attributes: [],
            required: false,
          },
        ],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Index with Restrictions and Releases

  async indexRL(req, res) {
    try {
      const result = await MaterialIn.findAll({
        attributes: [
          'id',
          'materialIntypeId',
          'userId',
          [Sequelize.literal('`MaterialIntype`.`type`'), 'type'],
          [Sequelize.literal('`User`.`username`'), 'receivedBy'],
          'req',
          [Sequelize.currencyBr('`MaterialIn`.`value`'), 'value'],

          'requiredBy',
          'reqMaintenance',
          'reqUnit',
          'costUnit',
          [Sequelize.literal('`Unidade`.`sigla`'), 'costUnitSigla'],
          [Sequelize.literal('`Unidade`.`nome_unidade`'), 'costUnitNome'],
          [Sequelize.dataBr('`MaterialIn`.`register_date`'), 'registerDate'],
          [Sequelize.dataBr(
            '`MaterialIn`.`created_at`',
          ),
          'createdAt',
          ],
          'obs',
        ],
        where: {
          materialIntypeId: { [Op.lte]: 3 },
          req: { [Op.not]: null },
        },
        include: [
          {
            model: MaterialInItem,
            attributes: [
              ['material_id', 'materialId'],
              [Sequelize.literal('`MaterialInItems->Material`.`name`'), 'name'],
              [Sequelize.literal('`MaterialInItems->Material`.`specification`'), 'specification'],
              [Sequelize.literal('`MaterialInItems->Material`.`unit`'), 'unit'],
              'quantity',
              [
                Sequelize.fn(
                  'format',
                  Sequelize.col('`MaterialInItems`.`value`'),
                  2,
                  'pt_BR',
                ),
                'value',
              ],
            ],
            required: false,
            include: {
              model: Material,
              attributes: [],
              required: false,
            },
          },
          {
            model: MaterialRestrict,
            attributes: [
              'id',
              'userId',
              [Sequelize.literal('`MaterialRestricts->User`.`username`'), 'userName'],
              [Sequelize.dataBr('`MaterialRestricts`.`created_at`'), 'createdAt'],
            ],
            include: [{
              model: MaterialRestrictItem,
              attributes: [
                ['material_id', 'materialId'],
                [Sequelize.literal('`MaterialRestricts->MaterialRestrictItems->Material`.`name`'), 'name'],
                [Sequelize.literal('`MaterialRestricts->MaterialRestrictItems->Material`.`specification`'), 'specification'],
                [Sequelize.literal('`MaterialRestricts->MaterialRestrictItems->Material`.`unit`'), 'unit'],
                'quantity',
                [Sequelize.currencyBr('`MaterialRestricts->MaterialRestrictItems`.`value`'), 'value'],
              ],
              required: false,
              include: {
                model: Material,
                attributes: [],
                required: false,
              },
            }, {
              model: User,
              attributes: [],
              required: false,
            }],
          },
          {
            model: MaterialRelease,
            attributes: [
              'id',
              'userId',
              [Sequelize.literal('`MaterialReleases->User`.`username`'), 'userName'],
              [Sequelize.dataBr('`MaterialReleases`.`created_at`'), 'createdAt'],
            ],
            include: [{
              model: MaterialReleaseItem,
              attributes: [
                ['material_id', 'materialId'],
                [Sequelize.literal('`MaterialReleases->MaterialReleaseItems->Material`.`name`'), 'name'],
                [Sequelize.literal('`MaterialReleases->MaterialReleaseItems->Material`.`specification`'), 'specification'],
                [Sequelize.literal('`MaterialReleases->MaterialReleaseItems->Material`.`unit`'), 'unit'],
                'quantity',
                [Sequelize.currencyBr('`MaterialReleases->MaterialReleaseItems`.`value`'), 'value'],
              ],
              required: false,
              include: {
                model: Material,
                attributes: [],
                required: false,
              },
            }, {
              model: User,
              attributes: [],
              required: false,
            }],
          },
          {
            model: User,
            attributes: [],
            required: false,
          },
          {
            model: Unidade,
            attributes: [],
            required: false,
          },
          {
            model: MaterialIntype,
            required: false,
          },
        ],
        order: [
          ['id', 'DESC'],
        ],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Show with Restrictions and Releases

  async showRL(req, res) {
    try {
      const { reqMaintenance, year } = req.params;
      const result = await MaterialIn.findAll({
        attributes: [
          'id',
          'materialIntypeId',
          'userId',
          [Sequelize.literal('`MaterialIntype`.`type`'), 'type'],
          [Sequelize.literal('`User`.`username`'), 'receivedBy'],
          'req',
          [Sequelize.currencyBr('`MaterialIn`.`value`'), 'value'],

          'requiredBy',
          'reqMaintenance',
          'reqUnit',
          'costUnit',
          [Sequelize.literal('`Unidade`.`sigla`'), 'costUnitSigla'],
          [Sequelize.literal('`Unidade`.`nome_unidade`'), 'costUnitNome'],
          [Sequelize.dataBr('`MaterialIn`.`register_date`'), 'registerDate'],
          [Sequelize.dataBr(
            '`MaterialIn`.`created_at`',
          ),
          'createdAt',
          ],
          'obs',
        ],
        where: {
          reqMaintenance: `${reqMaintenance}/${year}`,
        },
        include: [
          {
            model: MaterialInItem,
            attributes: [
              ['material_id', 'materialId'],
              [Sequelize.literal('`MaterialInItems->Material`.`name`'), 'name'],
              [Sequelize.literal('`MaterialInItems->Material`.`specification`'), 'specification'],
              [Sequelize.literal('`MaterialInItems->Material`.`unit`'), 'unit'],
              'quantity',
              [
                Sequelize.fn(
                  'format',
                  Sequelize.col('`MaterialInItems`.`value`'),
                  2,
                  'pt_BR',
                ),
                'value',
              ],
            ],
            required: false,
            include: {
              model: Material,
              attributes: [],
              required: false,
            },
          },
          {
            model: MaterialRestrict,
            attributes: [
              'id',
              'userId',
              [Sequelize.literal('`MaterialRestricts->User`.`username`'), 'userName'],
              [Sequelize.dataBr('`MaterialRestricts`.`created_at`'), 'createdAt'],
            ],
            include: [{
              model: MaterialRestrictItem,
              attributes: [
                ['material_id', 'materialId'],
                [Sequelize.literal('`MaterialRestricts->MaterialRestrictItems->Material`.`name`'), 'name'],
                [Sequelize.literal('`MaterialRestricts->MaterialRestrictItems->Material`.`specification`'), 'specification'],
                [Sequelize.literal('`MaterialRestricts->MaterialRestrictItems->Material`.`unit`'), 'unit'],
                'quantity',
                [Sequelize.currencyBr('`MaterialRestricts->MaterialRestrictItems`.`value`'), 'value'],
              ],
              required: false,
              include: {
                model: Material,
                attributes: [],
                required: false,
              },
            }, {
              model: User,
              attributes: [],
              required: false,
            }],
          },
          {
            model: MaterialRelease,
            attributes: [
              'id',
              'userId',
              [Sequelize.literal('`MaterialReleases->User`.`username`'), 'userName'],
              [Sequelize.dataBr('`MaterialReleases`.`created_at`'), 'createdAt'],
            ],
            include: [{
              model: MaterialReleaseItem,
              attributes: [
                ['material_id', 'materialId'],
                [Sequelize.literal('`MaterialReleases->MaterialReleaseItems->Material`.`name`'), 'name'],
                [Sequelize.literal('`MaterialReleases->MaterialReleaseItems->Material`.`specification`'), 'specification'],
                [Sequelize.literal('`MaterialReleases->MaterialReleaseItems->Material`.`unit`'), 'unit'],
                'quantity',
                [Sequelize.currencyBr('`MaterialReleases->MaterialReleaseItems`.`value`'), 'value'],
              ],
              required: false,
              include: {
                model: Material,
                attributes: [],
                required: false,
              },
            }, {
              model: User,
              attributes: [],
              required: false,
            }],
          },
          {
            model: User,
            attributes: [],
            required: false,
          },
          {
            model: Unidade,
            attributes: [],
            required: false,
          },
          {
            model: MaterialIntype,
            required: false,
          },
        ],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Show
  async showId(req, res) {
    try {
      if (!req.body.req) {
        return res.status(400).json({
          errors: 'Parâmetro de id não enviado',
        });
      }

      const exists = await MaterialIn.findOne({ where: { req: req.body.req } });

      if (!exists) {
        return res.boolean(false);
      }

      return res.json(exists);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new MaterialInController();
