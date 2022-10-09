import WorkerContract from '../models/WorkerContract';

class WorkerContractController {
  // Index

  async index(req, res) {
    try {
      const result = await WorkerContract.findAll();
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
}

export default new WorkerContractController();
