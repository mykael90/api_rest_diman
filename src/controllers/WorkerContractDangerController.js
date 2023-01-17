import WorkerContractDanger from '../models/WorkerContractDanger';

class WorkerContractDangerController {
  // Index

  async index(req, res) {
    try {
      const result = await WorkerContractDanger.findAll();
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const workerJobtype = await WorkerContractDanger.create(req.body);
      return res.json(workerJobtype);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new WorkerContractDangerController();
