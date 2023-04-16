import Sequelize, { QueryTypes } from 'sequelize';
import BuildingSection from '../models/BuildingSection';

class BuildingSectionController {
  // Index

  async index(req, res) {
    try {
      const result = await BuildingSection.findAll();
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Show
  async show(req, res) {
    try {
      const result = await BuildingSection.findAll({
        where: {
          BuildingSipacSubRip: req.body.subRip,
        },
      });
      return res.json(result);
    } catch (e) {
      return res.json(null);
    }
  }

  // Recursive RAW
  async recursive(req, res) {
    try {
      const result = await BuildingSection.sequelize.query(
        `with recursive r as ( select * from buildings_sections as bs where bs.building_sipac_sub_rip = '${req.body.subRip}' union all select bs.* from r join buildings_sections as bs on bs.super_id = r.id ) select * from r;`,
        { type: QueryTypes.SELECT }
      );
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Store
  async store(req, res) {
    try {
      const data = await BuildingSection.create(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new BuildingSectionController();
