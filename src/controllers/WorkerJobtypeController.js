import WorkerJobtype from '../models/WorkerJobtype';

class WorkerJobtypeController {
  // Index

  async index(req, res) {
    try {
      const result = await WorkerJobtype.findAll({
        attributes: ['id', 'job'],
        order: [['id', 'ASC']],
      });
      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }

  // Store
  async store(req, res) {
    try {
      const workerJobtype = await WorkerJobtype.create(req.body);
      return res.json(workerJobtype);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new WorkerJobtypeController();
