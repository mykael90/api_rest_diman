import Unidade from '../models/Unidade';
import MaterialIn from '../models/MaterialIn';
import WorkerContract from '../models/WorkerContract';

class UnidadeController {
  // Index

  async index(req, res) {
    try {
      const unidades = await Unidade.findAll(
        {
          include: [
            // {
            //   model: MaterialIn,
            // },
            // {
            //   model: WorkerContract,
            // },
          ],
        },
      );
      return res.json(unidades);
    } catch (e) {
      return res.json({
        errors: [e.message],
      });
    }
  }
}

export default new UnidadeController();
