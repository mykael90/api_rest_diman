import WorkerAddress from '../models/WorkerAddress';

class WorkerAddressController {
  // Index

  async index(req, res) {
    try {
      const result = await WorkerAddress.findAll({});
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
      const workerAddress = await WorkerAddress.create(req.body);
      return res.json(workerAddress);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new WorkerAddressController();
