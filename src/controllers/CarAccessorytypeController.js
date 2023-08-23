import CarAccessorytype from '../models/CarAccessorytype';

class CarAccessorytypeController {
  // Index

  async index(req, res) {
    try {
      const result = await CarAccessorytype.findAll();

      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new CarAccessorytypeController();
