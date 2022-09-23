import MaterialInventory from '../models/MaterialInventory';

class MaterialInventoryController {
  // Index

  async index(req, res) {
    try {
      const result = await MaterialInventory.findAll();
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
      const material = await MaterialInventory.create(req.body);
      return res.json(material);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new MaterialInventoryController();
