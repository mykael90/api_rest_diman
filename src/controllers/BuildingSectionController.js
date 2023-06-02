import Sequelize, { QueryTypes } from 'sequelize';
import BuildingSection from '../models/BuildingSection';
import flatArrayToTree from '../asset/script/flatArrayToTree';

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
        `with recursive r as ( select * from buildings_sections as bs where bs.building_sipac_sub_rip = '${req.params.subRip}' and isnull(bs.super_id) union all select bs.* from r join buildings_sections as bs on bs.super_id = r.id ) select * from r;`,
        { type: QueryTypes.SELECT }
      );

      result.forEach((obj) => {
        console.log(obj);
        obj.BuildingSipacSubRip = obj.building_sipac_sub_rip;
        obj.superId = obj.super_id;
        obj.buildingSectiontypeId = obj.building_sectiontype_id;
        delete obj.building_sipac_sub_rip;
        delete obj.super_id;
        delete obj.building_sectiontype_id;
      });

      const treeArray = flatArrayToTree(result, null);

      return res.json(treeArray);
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

  // Store Bulk (multiple items)
  async storeBulk(req, res) {
    try {
      const data = await BuildingSection.bulkCreate(req.body, {
        updateOnDuplicate: [
          'building_sectiontype_id',
          'name',
          'cod',
          'obs',
          'inactive',
        ],
      });
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new BuildingSectionController();
