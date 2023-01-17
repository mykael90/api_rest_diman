import WorkerContractRegime from '../models/WorkerContractRegime';

class WorkerContractRegimeController {
  // Index

  async index(req, res) {
    try {
      const result = await WorkerContractRegime.findAll();
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const workerJobtype = await WorkerContractRegime.create(req.body);
      return res.json(workerJobtype);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new WorkerContractRegimeController();
