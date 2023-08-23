import CarStatus from '../models/CarStatus';
import CarStatustype from '../models/CarStatustype';

class CarStatusController {
  // Index

  async index(req, res) {
    try {
      const result = await CarStatus.findAll({
        include: [CarStatustype],
        order: ['id', 'DESC'],
      });

      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async store(req, res) {
    try {
      const status = await CarStatus.create(req.body);
      return res.json(status);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new CarStatusController();
