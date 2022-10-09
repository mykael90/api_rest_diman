import Address from '../models/Address';
import Worker from '../models/Worker';
import WorkerAddress from '../models/WorkerAddress';

class AddressController {
  // Index

  async index(req, res) {
    try {
      const result = await Address.findAll({
        include: [
          {
            model: Worker,
          },
          {
            model: WorkerAddress,
          },
        ],
      });
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
      const address = await Address.create(req.body);
      return res.json(address);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new AddressController();
