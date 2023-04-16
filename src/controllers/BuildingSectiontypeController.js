import BuildingSectiontype from '../models/BuildingSectiontype';

class BuildingSectiontypeController {
  // Index

  async index(req, res) {
    try {
      const result = await BuildingSectiontype.findAll();
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const data = await BuildingSectiontype.create(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new BuildingSectiontypeController();
