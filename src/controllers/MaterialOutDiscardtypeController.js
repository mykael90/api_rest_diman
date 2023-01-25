import MaterialOutDiscardtype from '../models/MaterialOutDiscardtype';

class MaterialOutDiscardtypeController {
  // Index

  async index(req, res) {
    try {
      const result = await MaterialOutDiscardtype.findAll();
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new MaterialOutDiscardtypeController();
