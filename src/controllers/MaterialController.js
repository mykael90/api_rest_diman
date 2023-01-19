import Sequelize, { Op } from 'sequelize';

import { extname } from 'path';

import Material from '../models/Material';

class MaterialController {
  // Index

  async index(req, res) {
    try {
      const result = await Material.findAll({
        attributes: ['id', 'id_catmat', 'name', 'unit', 'specification', 'group_sipac', 'filename_photo'],
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
      const index = Number(await Material.count({
        where: {
          id: {
            [Op.like]: '9999%',
          },
        },
        col: 'id',
      }));

      // custom id entry
      req.body.id = `9999${(index + 1).toString().padStart(4, '0')}`;
      req.body.groupSipac = '9999';
      const material = await Material.create(req.body);
      if (!req.file) return res.json(material);

      // If has file --->
      req.result = { ...material.dataValues };
      req.dimensionResized = 600; // new dimension to photo
      const fileExtension = extname(req.file.originalname);
      req.fileName = `${Material.name.toLowerCase()}_${req.result.id}${fileExtension}`;
      // update filename field on database
      await Material.update({ filenamePhoto: req.fileName }, {
        where: {
          id: req.result.id,
        },
      });
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
}

export default new MaterialController();
