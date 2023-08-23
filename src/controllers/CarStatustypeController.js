import CarStatustype from '../models/CarStatustype';

class CarStatustypeController {
  // Index

  async index(req, res) {
    try {
      const result = await CarStatustype.findAll();

      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new CarStatustypeController();
